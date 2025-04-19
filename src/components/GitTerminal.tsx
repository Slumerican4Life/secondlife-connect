
import React, { useState } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Terminal } from "lucide-react";

const GitTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [output, setOutput] = useState('');
  const [repoPath, setRepoPath] = useState('D:/SecondlifeConnect');

  const executeGitCommand = async (command: string) => {
    try {
      // In a real implementation, this would connect to a backend service
      // that executes git commands. For now, we'll simulate the output
      setOutput(prev => `${prev}\n> ${command}\nExecuting git command...\nSuccess!`);
    } catch (error) {
      setOutput(prev => `${prev}\n> ${command}\nError: ${error}`);
    }
  };

  const handlePush = () => {
    executeGitCommand(`git push origin main`);
  };

  const handleCommit = () => {
    const timestamp = new Date().toISOString();
    executeGitCommand(`git commit -m "Update ${timestamp}"`);
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 h-12 w-12"
        onClick={() => setIsOpen(true)}
      >
        <Terminal className="h-6 w-6" />
      </Button>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Git Terminal</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            <div className="flex space-x-2">
              <Button onClick={handleCommit}>Commit</Button>
              <Button onClick={handlePush}>Push</Button>
            </div>
            <Textarea
              value={output}
              readOnly
              className="font-mono text-sm h-[200px] bg-black text-green-400"
            />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default GitTerminal;
