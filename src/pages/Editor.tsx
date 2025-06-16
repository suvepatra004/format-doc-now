import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, FileText, Save, File } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import html2pdf from 'html2pdf.js';

export default function Editor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [formattedContent, setFormattedContent] = useState('');
  const [customFilename, setCustomFilename] = useState('');
  const { user } = useAuth();
  const { toast } = useToast();

  const formatContent = () => {
    if (!content.trim()) return;

    // Enhanced formatting logic
    let lines = content.split('\n');
    let formatted = '';
    let currentSection = '';
    
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      
      // Skip empty lines
      if (!line) {
        if (currentSection) {
          formatted += '</p>\n\n';
          currentSection = '';
        }
        continue;
      }
      
      // Detect headings (short lines without periods, or lines with specific patterns)
      if ((line.length < 80 && !line.includes('.') && !line.includes(',')) || 
          line.match(/^(Chapter|Section|\d+\.)/i)) {
        if (currentSection) {
          formatted += '</p>\n\n';
          currentSection = '';
        }
        formatted += `<h2 style="font-size: 1.5rem; font-weight: bold; margin: 1rem 0 0.5rem 0; color: #333;">${line}</h2>\n\n`;
      }
      // Detect bullet points
      else if (line.match(/^[-*•]/)) {
        if (currentSection) {
          formatted += '</p>\n\n';
          currentSection = '';
        }
        formatted += `<ul style="margin: 0.5rem 0; padding-left: 1.5rem;"><li style="margin: 0.25rem 0;">${line.replace(/^[-*•]\s*/, '')}</li></ul>\n`;
      }
      // Regular paragraphs
      else {
        if (!currentSection) {
          formatted += '<p style="margin: 1rem 0; line-height: 1.6; text-align: justify;">';
          currentSection = 'paragraph';
        } else {
          formatted += ' ';
        }
        formatted += line;
      }
    }
    
    // Close any open paragraph
    if (currentSection) {
      formatted += '</p>';
    }

    setFormattedContent(formatted);
    toast({
      title: "Content formatted!",
      description: "Your content has been formatted with proper spacing and structure.",
    });
  };

  const downloadPDF = () => {
    const filename = customFilename || title || 'document';
    const element = document.createElement('div');
    element.innerHTML = `
      <div style="padding: 40px; font-family: 'Quicksand', Arial, sans-serif; max-width: 800px; margin: 0 auto;">
        <h1 style="color: #333; margin-bottom: 30px; font-size: 2rem; font-weight: bold;">${title || 'Document'}</h1>
        ${formattedContent || `<p style="margin: 1rem 0; line-height: 1.6;">${content}</p>`}
      </div>
    `;

    const opt = {
      margin: 1,
      filename: `${filename}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
    
    toast({
      title: "PDF downloaded!",
      description: `Your document has been saved as ${filename}.pdf`,
    });
  };

  const downloadTXT = () => {
    const filename = customFilename || title || 'document';
    const element = document.createElement('a');
    const file = new Blob([`${title}\n\n${content}`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${filename}.txt`;
    element.click();
    
    toast({
      title: "TXT downloaded!",
      description: `Your document has been saved as ${filename}.txt`,
    });
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 grain">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold gradient-text mb-2">Document Editor</h1>
          <p className="text-muted-foreground">
            Paste your content, format it automatically, and download in your preferred format.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="glass border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Input Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Document Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter document title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="glass"
                  />
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Paste your unformatted content here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[400px] glass resize-none"
                  />
                </div>
                <Button onClick={formatContent} className="w-full">
                  Auto-Format Content
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Preview Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="glass border-border/40">
              <CardHeader>
                <CardTitle>Preview & Download</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="min-h-[400px] p-4 border border-border/40 rounded-lg glass-subtle">
                  {formattedContent ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: formattedContent }}
                      className="prose prose-sm max-w-none"
                    />
                  ) : (
                    <div className="text-muted-foreground text-center py-8">
                      Format your content to see the preview
                    </div>
                  )}
                </div>
                {/* Custom Filename Section */}
                <div className="space-y-2">
                  <Label htmlFor="filename">Custom Filename (Optional)</Label>
                  <div className="flex gap-2">
                    <File className="h-4 w-4 mt-3 text-muted-foreground" />
                    <Input
                      id="filename"
                      placeholder="Enter custom filename..."
                      value={customFilename}
                      onChange={(e) => setCustomFilename(e.target.value)}
                      className="glass"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Leave blank to use document title as filename
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={downloadPDF}
                    disabled={!content.trim()}
                    className="flex-1"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button
                    onClick={downloadTXT}
                    disabled={!content.trim()}
                    variant="outline"
                    className="flex-1 btn-glass"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download TXT
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}