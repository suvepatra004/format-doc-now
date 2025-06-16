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

    let processedContent = content;

    // 1. Fix proper casing and "i" to "I"
    processedContent = processedContent.replace(/\bi\b/g, 'I');
    processedContent = processedContent.replace(/([.!?]\s*)([a-z])/g, (match, punct, letter) => punct + letter.toUpperCase());
    processedContent = processedContent.replace(/^([a-z])/, (match, letter) => letter.toUpperCase());

    // 2. Fix punctuation - remove repeated punctuation
    processedContent = processedContent.replace(/[!]{2,}/g, '!');
    processedContent = processedContent.replace(/[?]{2,}/g, '?');
    processedContent = processedContent.replace(/[.]{2,}/g, '.');
    processedContent = processedContent.replace(/[,]{2,}/g, ',');

    // 3. Clean spacing - remove extra spaces
    processedContent = processedContent.replace(/\s+/g, ' ');
    processedContent = processedContent.replace(/\s+([.!?,:;])/g, '$1');
    processedContent = processedContent.replace(/([.!?])\s*([A-Z])/g, '$1 $2');

    // 4. Wrap potential code snippets in backticks
    processedContent = processedContent.replace(/\b(function\(|console\.log|\.js|\.html|\.css|\/\/|#include|import |export )/g, '`$1');
    processedContent = processedContent.replace(/(`[^`]*?)(\s|$)/g, '$1`$2');

    // Split into lines for further processing
    let lines = processedContent.split('\n');
    let formatted = '';
    let currentSection = '';
    let inList = false;
    
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      
      // Skip completely empty lines but preserve paragraph breaks
      if (!line) {
        if (currentSection === 'paragraph') {
          formatted += '</p>\n\n';
          currentSection = '';
        } else if (inList) {
          formatted += '</ul>\n\n';
          inList = false;
        }
        continue;
      }

      // 5. Fix broken sentences - merge lines that don't end with proper punctuation
      if (i > 0 && !lines[i-1].trim().match(/[.!?]$/) && !line.match(/^[-*•\d]/)) {
        // This line might be a continuation of the previous line
        if (currentSection === 'paragraph') {
          formatted += ' ' + line;
          continue;
        }
      }
      
      // 6. Detect headings (short lines, specific patterns, or lines in ALL CAPS)
      if (line.match(/^[A-Z\s]{5,}$/) || 
          (line.length < 80 && !line.includes('.') && !line.includes(',') && line.length > 3) || 
          line.match(/^(Chapter|Section|\d+\.|\d+\))/i)) {
        
        if (currentSection === 'paragraph') {
          formatted += '</p>\n\n';
          currentSection = '';
        }
        if (inList) {
          formatted += '</ul>\n\n';
          inList = false;
        }
        
        // Convert ALL CAPS to Title Case
        if (line.match(/^[A-Z\s]+$/)) {
          line = line.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
        }
        
        formatted += `<h2 style="font-size: 1.5rem; font-weight: bold; margin: 1.5rem 0 0.75rem 0; color: #333; text-transform: capitalize;">${line}</h2>\n\n`;
      }
      // 7. Detect and format lists
      else if (line.match(/^[-*•]\s/) || line.match(/^\d+[.)]\s/)) {
        if (currentSection === 'paragraph') {
          formatted += '</p>\n\n';
          currentSection = '';
        }
        
        if (!inList) {
          formatted += '<ul style="margin: 0.75rem 0; padding-left: 1.5rem; list-style-type: disc;">\n';
          inList = true;
        }
        
        let listContent = line.replace(/^[-*•]\s*/, '').replace(/^\d+[.)]\s*/, '');
        // Add period if missing
        if (!listContent.match(/[.!?]$/)) {
          listContent += '.';
        }
        formatted += `  <li style="margin: 0.5rem 0; line-height: 1.6;">${listContent}</li>\n`;
      }
      // 8. Regular paragraphs
      else {
        if (inList) {
          formatted += '</ul>\n\n';
          inList = false;
        }
        
        if (currentSection !== 'paragraph') {
          formatted += '<p style="margin: 1rem 0; line-height: 1.8; text-align: justify; text-indent: 1.5em;">';
          currentSection = 'paragraph';
        } else {
          formatted += ' ';
        }
        
        // Add period if sentence doesn't end with punctuation
        if (!line.match(/[.!?]$/)) {
          line += '.';
        }
        
        formatted += line;
      }
    }
    
    // Close any open tags
    if (currentSection === 'paragraph') {
      formatted += '</p>';
    }
    if (inList) {
      formatted += '</ul>';
    }

    setFormattedContent(formatted);
    toast({
      title: "Content formatted successfully!",
      description: "Applied advanced formatting with proper casing, punctuation, spacing, and structure.",
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