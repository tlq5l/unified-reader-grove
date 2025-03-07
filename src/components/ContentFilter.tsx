
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuRadioGroup, 
  DropdownMenuRadioItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { BookOpenText, Calendar, Filter, Grid3X3, LayoutList, Monitor } from "lucide-react";

interface ContentFilterProps {
  view: 'grid' | 'list';
  setView: (view: 'grid' | 'list') => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  contentType: string;
  setContentType: (type: string) => void;
}

const ContentFilter = ({ 
  view, setView,
  sortBy, setSortBy,
  contentType, setContentType
}: ContentFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 items-center justify-between mb-6">
      <div className="flex gap-2 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Filter size={16} />
              <span>Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuRadioGroup value={contentType} onValueChange={setContentType}>
              <DropdownMenuRadioItem value="all">All content types</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="article" className="gap-2">
                <Monitor size={16} /> Articles
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="pdf" className="gap-2">
                <BookOpenText size={16} /> PDFs
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="newsletter" className="gap-2">
                <BookOpenText size={16} /> Newsletters
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="video" className="gap-2">
                <Monitor size={16} /> Videos
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Calendar size={16} />
              <span>Sort</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
              <DropdownMenuRadioItem value="newest">Newest first</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="oldest">Oldest first</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="title">Title A-Z</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="source">Source</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="flex items-center border rounded-md overflow-hidden">
        <Button 
          variant={view === 'grid' ? 'default' : 'ghost'} 
          size="sm" 
          className="rounded-none h-9"
          onClick={() => setView('grid')}
        >
          <Grid3X3 size={16} />
        </Button>
        <Button 
          variant={view === 'list' ? 'default' : 'ghost'} 
          size="sm" 
          className="rounded-none h-9"
          onClick={() => setView('list')}
        >
          <LayoutList size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ContentFilter;
