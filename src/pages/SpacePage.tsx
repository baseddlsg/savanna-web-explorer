
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Space page component with placeholder content
 */
export default function SpacePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Space</h1>
      <p className="text-muted-foreground mb-8">
        Your personal workspace for organizing content.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p>View and manage your ongoing projects.</p>
            <div className="mt-4 text-xs text-muted-foreground">
              5 active projects
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Access your personal and shared notes.</p>
            <div className="mt-4 text-xs text-muted-foreground">
              12 notes updated recently
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bookmarks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage your saved links and resources.</p>
            <div className="mt-4 text-xs text-muted-foreground">
              24 saved bookmarks
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <p>View your upcoming events and deadlines.</p>
            <div className="mt-4 text-xs text-muted-foreground">
              3 events this week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Files</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Access and organize your uploaded files.</p>
            <div className="mt-4 text-xs text-muted-foreground">
              128 MB used of 5 GB
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shared</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Content shared with you by other users.</p>
            <div className="mt-4 text-xs text-muted-foreground">
              7 shared items
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
