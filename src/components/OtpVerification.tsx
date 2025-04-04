
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";

interface OtpVerificationProps {
  email: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const OtpVerification = ({ email, onSuccess, onCancel }: OtpVerificationProps) => {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleSubmit = () => {
    if (otp.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter a valid 6-digit code",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulating verification - In a real app, this would call an API
    setTimeout(() => {
      if (otp === "123456") { // For demo, any 6-digit code works
        onSuccess();
      } else {
        toast({
          title: "Invalid Code",
          description: "The verification code you entered is incorrect",
          variant: "destructive",
        });
        setIsSubmitting(false);
      }
    }, 1500);
  };

  const handleResendCode = () => {
    setIsResending(true);
    
    // Simulating code resend
    setTimeout(() => {
      setTimeLeft(60);
      toast({
        title: "Code Resent",
        description: "A new verification code has been sent to your email",
      });
      setIsResending(false);
    }, 1500);
  };

  const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, "$1***$3");

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md shadow-lg animate-fade-in">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Verification Required</CardTitle>
          <CardDescription className="text-center">
            Enter the 6-digit code sent to {maskedEmail}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center py-4">
            <InputOTP 
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
              render={({ slots }) => (
                <InputOTPGroup>
                  {slots.map((slot, index) => (
                    <InputOTPSlot key={index} {...slot} index={index} />
                  ))}
                </InputOTPGroup>
              )}
            />
          </div>
          <div className="text-center text-sm text-muted-foreground">
            {timeLeft > 0 ? (
              <p>Resend code in {timeLeft} seconds</p>
            ) : (
              <Button 
                variant="link" 
                className="p-0 h-auto"
                onClick={handleResendCode}
                disabled={isResending}
              >
                {isResending ? "Resending..." : "Resend Code"}
              </Button>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={otp.length !== 6 || isSubmitting}>
            {isSubmitting ? "Verifying..." : "Verify"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OtpVerification;
