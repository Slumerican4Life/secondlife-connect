
import React, { useState, useEffect } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Terminal, FolderOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const GitTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [output, setOutput] = useState('');
  const [keyword, setKeyword] = useState('');
  const [pendingCommand, setPendingCommand] = useState<string | null>(null);
  const [selectedRepo, setSelectedRepo] = useState('auto-detect');
  const [customPath, setCustomPath] = useState('');
  
  const ACTIVATION_KEYWORD = 'melons';

  const repositories = {
    'auto-detect': 'Auto-detect repository',
    'github': 'https://github.com/yourusername/SecondlifeConnect',
    'd-drive': 'D:/SecondlifeConnect',
    'c-drive': 'C:/path/to/repository',
    'custom': customPath
  };

  useEffect(() => {
    // Attempt to auto-detect repository path when component mounts
    const detectRepository = async () => {
      try {
        // In a real implementation, this would use Node's process.cwd()
        // or similar to detect the current working directory
        const detectedPath = 'D:/SecondlifeConnect'; // Simulated detection
        setOutput(prev => `${prev}\n> Auto-detected repository at: ${detectedPath}`);
        setCustomPath(detectedPath);
      } catch (error) {
        console.error('Failed to auto-detect repository:', error);
        toast.error('Failed to auto-detect repository path');
      }
    };

    if (selectedRepo === 'auto-detect') {
      detectRepository();
    }
  }, [selectedRepo]);

  const executeGitCommand = async (command: string) => {
    try {
      const repoPath = selectedRepo === 'custom' ? customPath : repositories[selectedRepo as keyof typeof repositories];
      setOutput(prev => `${prev}\n> Using repository: ${repoPath}\n> ${command}\nExecuting git command...\nSuccess!`);
      setPendingCommand(null);
      setKeyword('');
      
      // Broadcast the command execution to other components that might be listening
      const event = new CustomEvent('git-command-executed', { 
        detail: { command, repository: repoPath } 
      });
      window.dispatchEvent(event);
      
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
        className="fixed bottom-4 right-20 h-12 w-12"
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
              <Label>Repository Location</Label>
              <Select value={selectedRepo} onValueChange={setSelectedRepo}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a repository" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto-detect">Auto-detect Repository</SelectItem>
                  <SelectItem value="github">GitHub Repository</SelectItem>
                  <SelectItem value="d-drive">D: Drive Repository</SelectItem>
                  <SelectItem value="c-drive">C: Drive Repository</SelectItem>
                  <SelectItem value="custom">Custom Path</SelectItem>
                </SelectContent>
              </Select>

              {selectedRepo === 'custom' && (
                <div className="mt-2">
                  <Label>Custom Repository Path</Label>
                  <div className="flex gap-2">
                    <Input
                      value={customPath}
                      onChange={(e) => setCustomPath(e.target.value)}
                      placeholder="Enter repository path..."
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        // In a real implementation, this would open a file picker
                        toast.info('File picker would open here');
                      }}
                    >
                      <FolderOpen className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
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
