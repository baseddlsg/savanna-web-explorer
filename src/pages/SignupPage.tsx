
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { OrDivider } from "@/components/auth/OrDivider";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { useUser } from "@/contexts/UserContext";
import { useEmailValidation, useUsernameValidation } from "@/hooks/useFormValidation";
import { Loader2 } from "lucide-react";

/**
 * Signup page component with registration form
 */
export default function SignupPage() {
  // Form fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Form state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  // Navigation
  const navigate = useNavigate();
  const { signUp } = useUser();
  
  // Validation hooks
  const { isChecking: isCheckingUsername, error: usernameError } = useUsernameValidation(username);
  const { isChecking: isCheckingEmail, error: emailError } = useEmailValidation(email);
  
  // Check if passwords match
  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  }, [password, confirmPassword]);
  
  // Whether the form is valid and can be submitted
  const isFormValid =
    username && 
    email && 
    password && 
    password === confirmPassword && 
    !usernameError && 
    !emailError && 
    !isCheckingUsername && 
    !isCheckingEmail;

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Final validation
    if (!isFormValid) {
      setErrorMessage("Please correct the errors in the form.");
      return;
    }
    
    try {
      setIsLoading(true);
      setErrorMessage("");
      
      // Attempt to sign up
      await signUp(email, password, username);
      
      // Navigate to login page
      navigate("/login", { 
        state: { message: "Please check your email to verify your account." } 
      });
    } catch (error: any) {
      console.error("Signup error:", error);
      setErrorMessage(
        error.message || "Failed to create account. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Create Account</CardTitle>
          <CardDescription className="text-center">
            Enter your information to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              {/* Social Authentication */}
              <SocialAuthButtons />
              
              {/* Divider */}
              <OrDivider className="my-2" />
              
              {/* Username field with live validation */}
              <div className="grid gap-2">
                <Label htmlFor="username">
                  Username
                  {isCheckingUsername && (
                    <Loader2 className="ml-2 h-4 w-4 inline animate-spin" />
                  )}
                </Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username"
                  required
                  disabled={isLoading}
                  className={usernameError ? "border-destructive" : ""}
                />
                {usernameError && (
                  <p className="text-sm text-destructive">{usernameError}</p>
                )}
              </div>
              
              {/* Email field with live validation */}
              <div className="grid gap-2">
                <Label htmlFor="email">
                  Email
                  {isCheckingEmail && (
                    <Loader2 className="ml-2 h-4 w-4 inline animate-spin" />
                  )}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className={emailError ? "border-destructive" : ""}
                  autoComplete="username"
                />
                {emailError && (
                  <p className="text-sm text-destructive">{emailError}</p>
                )}
              </div>
              
              {/* Password with strength meter */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <PasswordInput
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  showStrengthMeter={true}
                  required
                  disabled={isLoading}
                />
              </div>
              
              {/* Confirm password */}
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <PasswordInput
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className={!passwordMatch ? "border-destructive" : ""}
                />
                {!passwordMatch && (
                  <p className="text-sm text-destructive">Passwords do not match</p>
                )}
              </div>
              
              {/* Error message */}
              {errorMessage && (
                <p className="text-sm text-destructive">{errorMessage}</p>
              )}
              
              <Button 
                className="w-full mt-2" 
                type="submit" 
                disabled={isLoading || !isFormValid}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Creating account...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary underline-offset-4 hover:underline"
            >
              Sign In
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
