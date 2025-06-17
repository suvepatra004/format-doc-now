import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, FileText, Save, File, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import html2pdf from 'html2pdf.js';

export default function Editor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [formattedContent, setFormattedContent] = useState('');
  const [customFilename, setCustomFilename] = useState('');
  const [tone, setTone] = useState<'casual' | 'professional' | 'story'>('professional');
  const [isFormatting, setIsFormatting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const formatContent = async () => {
    if (!content.trim()) return;
    
    setIsFormatting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('format-with-ai', {
        body: { content, tone }
      });

      if (error) throw error;

      if (data?.formattedContent) {
        // Clean up any markdown artifacts like ```html or ```
        let cleanedContent = data.formattedContent
          .replace(/```html\s*/gi, '')
          .replace(/```\s*/g, '')
          .trim();
        
        setFormattedContent(cleanedContent);
        toast({
          title: "Content formatted with AI!",
          description: `Applied ${tone} formatting with grammar fixes, structure, and subheadings.`,
        });
      } else {
        throw new Error("No formatted content received");
      }
    } catch (error) {
      console.error('AI formatting error:', error);
      toast({
        title: "AI formatting failed",
        description: "Falling back to basic formatting...",
        variant: "destructive",
      });
      
      // Fallback to basic formatting
      basicFormatContent();
    } finally {
      setIsFormatting(false);
    }
  };

  const basicFormatContent = () => {
    if (!content.trim()) return;

    let processedContent = content;

    // Basic formatting logic (simplified version of previous)
    processedContent = processedContent.replace(/\bi\b/g, 'I');
    processedContent = processedContent.replace(/([.!?]\s*)([a-z])/g, (match, punct, letter) => punct + letter.toUpperCase());
    processedContent = processedContent.replace(/^([a-z])/, (match, letter) => letter.toUpperCase());
    processedContent = processedContent.replace(/\s+/g, ' ');
    
    const paragraphs = processedContent.split('\n\n').filter(p => p.trim());
    const formatted = paragraphs.map(p => 
      `<p style="margin: 1rem 0; line-height: 1.8; text-align: justify;">${p.trim()}</p>`
    ).join('\n\n');

    setFormattedContent(formatted);
    toast({
      title: "Content formatted!",
      description: "Applied basic formatting.",
    });
  };

  const downloadPDF = () => {
    const filename = customFilename || title || 'document';
    const element = document.createElement('div');
    element.innerHTML = `
      <div style="padding: 40px; font-family: 'Arial', sans-serif; max-width: 800px; margin: 0 auto; color: #333; line-height: 1.6;">
        <h1 style="color: #333; margin-bottom: 30px; font-size: 24px; font-weight: bold; text-align: center; page-break-inside: avoid;">${title || 'Document'}</h1>
        <div style="font-size: 14px; text-align: justify; word-wrap: break-word;">
          ${formattedContent || `<p style="margin: 16px 0; line-height: 1.6;">${content}</p>`}
        </div>
      </div>
    `;

    // Add the element to the DOM temporarily for proper rendering
    document.body.appendChild(element);

    const opt = {
      margin: 0.5,
      filename: `${filename}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      enableLinks: true,
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        removeContainer: true
      },
      jsPDF: { 
        unit: 'in', 
        format: 'a4', 
        orientation: 'portrait',
        putOnlyUsedFonts: true,
        floatPrecision: 16
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      // Remove the element from DOM after PDF generation
      document.body.removeChild(element);
      
      toast({
        title: "PDF downloaded!",
        description: `Your document has been saved as ${filename}.pdf`,
      });
    }).catch((error) => {
      // Remove element even if there's an error
      if (document.body.contains(element)) {
        document.body.removeChild(element);
      }
      console.error('PDF generation error:', error);
      toast({
        title: "PDF generation failed",
        description: "Please try again",
        variant: "destructive",
      });
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
                     className="min-h-[300px] glass resize-none"
                   />
                 </div>
                 <div>
                   <Label htmlFor="tone">Formatting Style</Label>
                   <Select value={tone} onValueChange={(value: 'casual' | 'professional' | 'story') => setTone(value)}>
                     <SelectTrigger className="glass">
                       <SelectValue placeholder="Select formatting style" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="professional">Professional</SelectItem>
                       <SelectItem value="casual">Casual</SelectItem>
                       <SelectItem value="story">Story</SelectItem>
                     </SelectContent>
                   </Select>
                 </div>
                 <Button onClick={formatContent} disabled={isFormatting} className="w-full">
                   {isFormatting ? (
                     <>
                       <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                       Formatting with AI...
                     </>
                   ) : (
                     <>
                       <Sparkles className="mr-2 h-4 w-4" />
                       AI Format Content
                     </>
                   )}
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
                 <div className="min-h-[300px] p-4 border border-border/40 rounded-lg glass-subtle overflow-y-auto max-h-[500px]">
                   {formattedContent ? (
                     <div
                       dangerouslySetInnerHTML={{ __html: formattedContent }}
                       className="prose prose-sm max-w-none [&>h2]:text-lg [&>h2]:font-bold [&>h2]:mt-6 [&>h2]:mb-3 [&>p]:mb-4 [&>p]:leading-relaxed"
                     />
                   ) : (
                     <div className="text-muted-foreground text-center py-8">
                       {isFormatting ? "AI is formatting your content..." : "Format your content to see the preview"}
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