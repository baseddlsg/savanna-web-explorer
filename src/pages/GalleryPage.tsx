
import { Card, CardContent } from "@/components/ui/card";

/**
 * Gallery item type
 */
interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

/**
 * Sample gallery data
 */
const galleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Savanna Sunrise",
    description: "Beautiful sunrise over the African plains",
    imageUrl: "https://placehold.co/600x400/F59E0B/FFFFFF/png?text=Savanna+Sunrise",
  },
  {
    id: "2",
    title: "Wildlife",
    description: "Majestic animals in their natural habitat",
    imageUrl: "https://placehold.co/600x400/65A30D/FFFFFF/png?text=Wildlife",
  },
  {
    id: "3",
    title: "Acacia Trees",
    description: "Iconic trees against the sunset",
    imageUrl: "https://placehold.co/600x400/78350F/FFFFFF/png?text=Acacia+Trees",
  },
  {
    id: "4",
    title: "River View",
    description: "Serene waters of the savanna",
    imageUrl: "https://placehold.co/600x400/1D4ED8/FFFFFF/png?text=River+View",
  },
  {
    id: "5",
    title: "Grasslands",
    description: "Vast stretches of golden grass",
    imageUrl: "https://placehold.co/600x400/92400E/FFFFFF/png?text=Grasslands",
  },
  {
    id: "6",
    title: "Night Sky",
    description: "Stars over the savanna landscape",
    imageUrl: "https://placehold.co/600x400/1E293B/FFFFFF/png?text=Night+Sky",
  },
];

/**
 * Gallery page component displaying a collection of images
 */
export default function GalleryPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gallery</h1>
      <p className="text-muted-foreground mb-8">
        Explore beautiful images from the savanna.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {galleryItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-4">
              <h3 className="font-medium text-lg mb-1">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
