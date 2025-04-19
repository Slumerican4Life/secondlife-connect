
import React, { useState, useEffect, useRef } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Terminal, FolderOpen, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import * as git from 'isomorphic-git';
import http from 'isomorphic-git/http/web';
import fs from 'fs';
import path from 'path';
import { Alert, AlertDescription } from "@/components/ui/alert";

const GitTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [output, setOutput] = useState('');
  const [keyword, setKeyword] = useState('');
  const [pendingCommand, setPendingCommand] = useState<string | null>(null);
  const [selectedRepo, setSelectedRepo] = useState('auto-detect');
  const [customPath, setCustomPath] = useState('');
  const [currentRepoPath, setCurrentRepoPath] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const successAudioRef = useRef<HTMLAudioElement | null>(null);

  const ACTIVATION_KEYWORD = 'melons';

  const detectRepository = async () => {
    try {
      const projectRoot = process.cwd();
      const gitDir = path.join(projectRoot, '.git');
      
      if (fs.existsSync(gitDir)) {
        setCurrentRepoPath(projectRoot);
        setOutput(prev => `${prev}\n> Auto-detected repository at: ${projectRoot}`);
      } else {
        toast.error('No Git repository found in the current directory');
      }
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
    const audio = new Audio('data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTguNDUuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/81DEFgAKuX1X7DEAAXc0an2GIABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV');
    successAudioRef.current = audio;
  }, []);

  // Mock implementation for browser environment
  const mockGitOperations = (command) => {
    return new Promise((resolve) => {
      // Simulate a delay for the operation
      setTimeout(() => {
        const timestamp = new Date().toISOString();
        
        if (command === 'git push origin main') {
          setOutput(prev => `${prev}\n> Successfully pushed to main branch`);
        } else if (command.includes('git commit')) {
          setOutput(prev => `${prev}\n> Commit created with timestamp: ${timestamp}`);
        }
        
        resolve(true);
      }, 1000);
    });
  };

  const executeGitCommand = async (command: string) => {
    try {
      const repoPath = selectedRepo === 'custom' ? customPath : currentRepoPath;
      
      // Use mock implementation for browser environment
      await mockGitOperations(command);
      
      setPendingCommand(null);
      setKeyword('');
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
    setPendingCommand('git push origin main');
    setOutput(prev => `${prev}\n> Command queued: git push origin main\nEnter activation keyword to execute`);
  };

  const handleCommit = () => {
    const timestamp = new Date().toISOString();
    const command = `git commit -m "Update timestamp"`;
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
            <DrawerTitle className="flex items-center gap-2">
              Git Terminal
              {showSuccess && (
                <CheckCircle className="h-5 w-5 text-green-500 animate-scale-in" />
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
