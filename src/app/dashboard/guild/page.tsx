import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hammer, Users } from "lucide-react"; 

export default function GuildPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)]">
        <Card className="w-full max-w-md text-center border-dashed bg-muted/30">
            <CardHeader>
                <div className="mx-auto bg-muted p-4 rounded-full mb-4">
                    <Hammer className="h-10 w-10 text-muted-foreground" />
                </div>
                <CardTitle className="text-2xl flex items-center justify-center gap-2">
                    <Users className="h-6 w-6" />
                    The Guild
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">
                    The Guild Hall is currently under construction.
                </p>
                <p className="text-sm text-muted-foreground">
                    Soon you will be able to form parties, talk with other Adventurers, and complete group quests for bonus XP!
                </p>
            </CardContent>
        </Card>
    </div>
  );
}