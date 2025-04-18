
import { users, currentUser } from "@/data/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const SuggestedUsers = () => {
  // Filter out the current user
  const suggestions = users.filter(user => user.id !== currentUser.id);
  
  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Suggested for you</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {suggestions.map(user => (
          <div key={user.id} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10 border border-border">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-virtual-200">{user.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <Link to={`/profile/${user.id}`} className="font-medium text-sm hover:underline">
                  {user.name}
                </Link>
                <p className="text-xs text-muted-foreground">@{user.username}</p>
              </div>
            </div>
            <Button size="sm" variant="outline" className="rounded-full">
              Follow
            </Button>
          </div>
        ))}
        <Button variant="ghost" size="sm" className="w-full text-virtual-400">
          See more
        </Button>
      </CardContent>
    </Card>
  );
};

export default SuggestedUsers;
