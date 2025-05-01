
import { useState } from 'react';
import { AppShell } from './layouts/AppShell';
import { ThemedButton } from './ThemedButton';
import { FormField } from './ui/form-field';
import { EnhancedDialog } from './ui/enhanced-dialog';
import { LoadingSpinner } from './ui/loading-spinner';
import { ErrorMessage } from './ui/error-message';
import { UserAvatar } from './UserAvatar';

export function ExampleUsage() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 2000);
  };

  return (
    <AppShell>
      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">UI Components</h2>
          <p className="text-muted-foreground">
            A showcase of our custom UI components for the Savannah application.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-semibold">Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <ThemedButton variant="primary">Primary Button</ThemedButton>
            <ThemedButton variant="secondary">Secondary Button</ThemedButton>
            <ThemedButton variant="danger">Danger Button</ThemedButton>
            <ThemedButton variant="outline">Outline Button</ThemedButton>
            <ThemedButton variant="ghost">Ghost Button</ThemedButton>
            <ThemedButton variant="link">Link Button</ThemedButton>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <ThemedButton variant="primary" loading>Loading</ThemedButton>
            <ThemedButton variant="primary" disabled>Disabled</ThemedButton>
            <ThemedButton variant="primary" loading loadingText="Submitting...">
              With Loading Text
            </ThemedButton>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <ThemedButton variant="primary" size="sm">Small</ThemedButton>
            <ThemedButton variant="primary" size="md">Medium</ThemedButton>
            <ThemedButton variant="primary" size="lg">Large</ThemedButton>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-semibold">User Avatar</h3>
          <div className="flex flex-wrap gap-6 items-end">
            <div className="text-center">
              <UserAvatar 
                src="https://github.com/shadcn.png" 
                alt="John Doe" 
                size="xs"
              />
              <p className="text-xs mt-2">XS</p>
            </div>
            <div className="text-center">
              <UserAvatar 
                src="https://github.com/shadcn.png" 
                alt="John Doe" 
                size="sm"
              />
              <p className="text-xs mt-2">SM</p>
            </div>
            <div className="text-center">
              <UserAvatar 
                src="https://github.com/shadcn.png" 
                alt="John Doe" 
                size="md"
              />
              <p className="text-xs mt-2">MD</p>
            </div>
            <div className="text-center">
              <UserAvatar 
                src="https://github.com/shadcn.png" 
                alt="John Doe" 
                size="lg"
              />
              <p className="text-xs mt-2">LG</p>
            </div>
            <div className="text-center">
              <UserAvatar 
                src="https://github.com/shadcn.png" 
                alt="John Doe" 
                size="xl"
              />
              <p className="text-xs mt-2">XL</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 items-end mt-4">
            <div className="text-center">
              <UserAvatar alt="Jane Smith" size="md" status="online" />
              <p className="text-xs mt-2">No Image (Initials)</p>
            </div>
            <div className="text-center">
              <UserAvatar alt="Jane Smith" size="md" status="online" />
              <p className="text-xs mt-2">Online</p>
            </div>
            <div className="text-center">
              <UserAvatar alt="Jane Smith" size="md" status="offline" />
              <p className="text-xs mt-2">Offline</p>
            </div>
            <div className="text-center">
              <UserAvatar alt="Jane Smith" size="md" status="busy" />
              <p className="text-xs mt-2">Busy</p>
            </div>
            <div className="text-center">
              <UserAvatar alt="Jane Smith" size="md" status="away" />
              <p className="text-xs mt-2">Away</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-semibold">Form Elements</h3>
          <form className="space-y-4 max-w-md">
            <FormField
              id="name"
              label="Full Name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              hint="As it appears on your ID"
              required
              validate={(value) => value.length < 3 ? "Name must be at least 3 characters" : undefined}
              successMessage="Name looks good"
            />

            <FormField
              id="email"
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              validate={(value) => {
                if (!value.includes('@')) return "Please enter a valid email";
                return undefined;
              }}
              successMessage="Email format is valid"
            />

            <FormField
              id="password"
              label="Password"
              type="password"
              placeholder="Choose a secure password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              showPasswordStrength
              hint="Must be at least 8 characters with numbers and symbols"
            />
          </form>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-semibold">Dialogs & Feedback</h3>
          <div className="flex flex-wrap gap-4">
            <ThemedButton onClick={() => setOpen(true)}>
              Open Dialog
            </ThemedButton>
            <ThemedButton 
              variant="secondary" 
              onClick={() => setShowError(!showError)}
            >
              {showError ? "Hide Error" : "Show Error"}
            </ThemedButton>
          </div>

          <EnhancedDialog
            open={open}
            onOpenChange={setOpen}
            title="User Registration"
            description="Fill out this form to create your account"
            footer={
              <div className="flex justify-between w-full">
                <ThemedButton 
                  variant="ghost" 
                  onClick={() => setOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </ThemedButton>
                <ThemedButton
                  variant="primary"
                  onClick={handleSubmit}
                  loading={loading}
                  loadingText="Creating Account..."
                >
                  Create Account
                </ThemedButton>
              </div>
            }
          >
            <form className="py-4 space-y-4">
              <FormField
                id="dialog-name"
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <FormField
                id="dialog-email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </form>
          </EnhancedDialog>

          {showError && (
            <ErrorMessage
              title="Failed to connect"
              description="We couldn't connect to our servers. Please check your internet connection and try again."
              onRetry={() => console.log("Retry clicked")}
            />
          )}

          {loading && <LoadingSpinner text="Processing your request..." />}
        </section>
      </div>
    </AppShell>
  );
}
