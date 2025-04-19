
import React, { useState } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Terminal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const GitTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [output, setOutput] = useState('');
  const [keyword, setKeyword] = useState('');
  const [pendingCommand, setPendingCommand] = useState<string | null>(null);
  const [selectedRepo, setSelectedRepo] = useState('d-drive');
  
  const ACTIVATION_KEYWORD = 'melons';

  const repositories = {
    'github': 'https://github.com/yourusername/SecondlifeConnect',
    'd-drive': 'D:/SecondlifeConnect',
    'c-drive': 'C:/path/to/repository'
  };

  const executeGitCommand = async (command: string) => {
    try {
      const repoPath = repositories[selectedRepo as keyof typeof repositories];
      setOutput(prev => `${prev}\n> Using repository: ${repoPath}\n> ${command}\nExecuting git command...\nSuccess!`);
      setPendingCommand(null);
      setKeyword('');
    } catch (error) {
      setOutput(prev => `${prev}\n> ${command}\nError: ${error}`);
    }
  };

  const handlePush = () => {
    setPendingCommand('git push origin main');
    setOutput(prev => `${prev}\n> Command queued: git push origin main\nEnter activation keyword to execute`);
  };

  const handleCommit = () => {
    const timestamp = new Date().toISOString();
    const command = `git commit -m "Update ${timestamp}"`;
    setPendingCommand(command);
    setOutput(prev => `${prev}\n> Command queued: ${command}\nEnter activation keyword to execute`);
  };

  const handleKeywordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.toLowerCase() === ACTIVATION_KEYWORD && pendingCommand) {
      executeGitCommand(pendingCommand);
    } else {
      setOutput(prev => `${prev}\n> Invalid keyword. Command not executed.`);
      setKeyword('');
    }
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
            <div className="space-y-2">
              <Label>Select Repository</Label>
              <Select value={selectedRepo} onValueChange={setSelectedRepo}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a repository" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="github">GitHub Repository</SelectItem>
                  <SelectItem value="d-drive">D: Drive Repository</SelectItem>
                  <SelectItem value="c-drive">C: Drive Repository</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleCommit}>Commit</Button>
              <Button onClick={handlePush}>Push</Button>
            </div>
            <Textarea
              value={output}
              readOnly
              className="font-mono text-sm h-[200px] bg-black text-green-400"
            />
            {pendingCommand && (
              <form onSubmit={handleKeywordSubmit} className="space-y-2">
                <Label htmlFor="keyword">Enter activation keyword to execute command:</Label>
                <div className="flex space-x-2">
                  <Input
                    id="keyword"
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Enter keyword..."
                  />
                  <Button type="submit">Execute</Button>
                </div>
              </form>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default GitTerminal;
