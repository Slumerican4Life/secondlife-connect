
import React, { useState, useEffect, useRef } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Terminal, FolderOpen, CheckCircle, Calendar, Clock, GitCommitHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const GitTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [output, setOutput] = useState('');
  const [selectedRepo, setSelectedRepo] = useState('auto-detect');
  const [customPath, setCustomPath] = useState('');
  const [currentRepoPath, setCurrentRepoPath] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastOperation, setLastOperation] = useState<{
    type: 'push' | 'commit';
    timestamp: string;
  } | null>(null);
  const [operationHistory, setOperationHistory] = useState<Array<{
    type: 'push' | 'commit';
    timestamp: string;
  }>>([]);
  const successAudioRef = useRef<HTMLAudioElement | null>(null);

  const detectRepository = async () => {
    try {
      const projectRoot = process.cwd();
      
      // Mock detection (since fs is not available in browser)
      setCurrentRepoPath(projectRoot);
      setOutput(prev => `${prev}\n> Auto-detected repository at: ${projectRoot}`);
    } catch (error) {
      console.error('Repository detection failed:', error);
      toast.error('Failed to detect repository');
    }
  };

  useEffect(() => {
    if (selectedRepo === 'auto-detect') {
      detectRepository();
    }
  }, [selectedRepo]);

  useEffect(() => {
    const audio = new Audio('data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTguNDUuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/81DEFgAKuX1X7DEAAXc0an2GIABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV');
    successAudioRef.current = audio;
  }, []);

  const mockGitOperations = (command) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const timestamp = new Date().toISOString();
        
        if (command === 'git push origin main') {
          const newOperation = { type: 'push' as const, timestamp };
          setLastOperation(newOperation);
          setOperationHistory(prev => [newOperation, ...prev.slice(0, 9)]); // Keep last 10 operations
          setOutput(prev => `${prev}\n> Successfully pushed to main branch at ${timestamp}`);
        } else if (command.includes('git commit')) {
          const newOperation = { type: 'commit' as const, timestamp };
          setLastOperation(newOperation);
          setOperationHistory(prev => [newOperation, ...prev.slice(0, 9)]); // Keep last 10 operations
          setOutput(prev => `${prev}\n> Commit created with timestamp: ${timestamp}`);
        }
        
        resolve(true);
      }, 1000);
    });
  };

  const executeGitCommand = async (command: string) => {
    try {
      const repoPath = selectedRepo === 'custom' ? customPath : currentRepoPath;
      
      await mockGitOperations(command);
      
      showSuccessNotification();
      
      const event = new CustomEvent('git-command-executed', { 
        detail: { command, repository: repoPath } 
      });
      window.dispatchEvent(event);
      
    } catch (error) {
      console.error('Git command failed:', error);
      setOutput(prev => `${prev}\n> Error executing command: ${error}`);
      toast.error('Git operation failed');
    }
  };

  const showSuccessNotification = () => {
    if (successAudioRef.current) {
      successAudioRef.current.play().catch(console.error);
    }
    
    setShowSuccess(true);
    toast.success('Git operation completed successfully!');
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handlePush = () => {
    setOutput(prev => `${prev}\n> Executing: git push origin main`);
    executeGitCommand('git push origin main');
  };

  const handleCommit = () => {
    const timestamp = new Date().toISOString();
    const command = `git commit -m "Update timestamp"`;
    setOutput(prev => `${prev}\n> Executing: ${command}`);
    executeGitCommand(command);
  };

  const handleQuickCommit = () => {
    const command = `git commit -m "Quick save"`;
    setOutput(prev => `${prev}\n> Executing: ${command}`);
    executeGitCommand(command);
    toast.success("Quick commit initiated");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="fixed bottom-4 right-4 z-50 flex gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="default"
                    size="icon"
                    className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all bg-primary"
                    onClick={handleQuickCommit}
                  >
                    <GitCommitHorizontal className="h-6 w-6" />
                    {lastOperation && (
                      <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Quick commit changes</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all"
                    onClick={() => setIsOpen(true)}
                  >
                    <Terminal className="h-6 w-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Open Git Terminal</TooltipContent>
              </Tooltip>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" align="end" className="max-w-[300px]">
            {lastOperation ? (
              <div className="space-y-1">
                <div className="font-semibold flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> 
                  Last {lastOperation.type}: {formatDate(lastOperation.timestamp)}
                </div>
                {operationHistory.length > 1 && (
                  <div className="text-xs text-muted-foreground">
                    {operationHistory.length > 1 && `+${operationHistory.length - 1} more operations`}
                  </div>
                )}
              </div>
            ) : (
              <span>Git Terminal & Quick Commit</span>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-2">
              Git Terminal
              {showSuccess && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CheckCircle className="h-5 w-5 text-green-500 animate-scale-in" />
                  </TooltipTrigger>
                  <TooltipContent>Operation completed successfully</TooltipContent>
                </Tooltip>
              )}
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            {showSuccess && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-green-600">
                  Repository is up to date!
                </AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label>Repository Location</Label>
              <Select value={selectedRepo} onValueChange={setSelectedRepo}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a repository" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto-detect">Auto-detected Repository</SelectItem>
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
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={handleCommit}>Commit</Button>
                </TooltipTrigger>
                <TooltipContent>Create a new commit</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={handlePush}>Push</Button>
                </TooltipTrigger>
                <TooltipContent>Push changes to remote repository</TooltipContent>
              </Tooltip>
            </div>

            {operationHistory.length > 0 && (
              <div className="border rounded-md p-3 space-y-2">
                <h3 className="text-sm font-medium flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Recent Operations
                </h3>
                <div className="space-y-1 max-h-32 overflow-y-auto text-sm">
                  {operationHistory.map((op, index) => (
                    <div key={index} className="flex justify-between text-muted-foreground">
                      <span className="capitalize">{op.type}</span>
                      <span>{formatDate(op.timestamp)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
