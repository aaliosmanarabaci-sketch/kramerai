import { CheckCircle2, XCircle, Lightbulb, TrendingUp, Users, MapPin, Download, Printer } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { Idea } from "@shared/schema";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useToast } from "@/hooks/use-toast";

interface IdeaDetailModalProps {
  idea: Idea | null;
  isOpen: boolean;
  onClose: () => void;
}

export function IdeaDetailModal({ idea, isOpen, onClose }: IdeaDetailModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  if (!idea) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!contentRef.current) {
      toast({
        title: "PDF Hatası",
        description: "İçerik hazırlanıyor, lütfen tekrar deneyin.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "PDF Oluşturuluyor",
      description: "Lütfen bekleyin...",
    });

    try {
      // Scroll pozisyonunu kaydet
      const scrollY = window.scrollY;

      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        windowWidth: contentRef.current.scrollWidth,
        windowHeight: contentRef.current.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        width: contentRef.current.scrollWidth,
        height: contentRef.current.scrollHeight,
        onclone: (clonedDoc) => {
          // Tüm stylesheet'leri kaldır
          const styleSheets = clonedDoc.querySelectorAll('style, link[rel="stylesheet"]');
          styleSheets.forEach(sheet => sheet.remove());
          
          // Tüm elementlerin stillerini computed values'a dönüştür
          const allElements = clonedDoc.querySelectorAll('*');
          allElements.forEach((el: Element) => {
            if (el instanceof HTMLElement) {
              try {
                const computedStyle = window.getComputedStyle(el);
                
                // Class'ları temizle (Tailwind CSS'den kaçınmak için)
                el.removeAttribute('class');
                el.removeAttribute('style');
                
                // Sadece önemli computed stilleri inline olarak ekle
                const cssText = [
                  computedStyle.backgroundColor && computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' 
                    ? `background-color: ${computedStyle.backgroundColor} !important` : '',
                  computedStyle.color ? `color: ${computedStyle.color} !important` : '',
                  computedStyle.fontSize ? `font-size: ${computedStyle.fontSize} !important` : '',
                  computedStyle.fontWeight ? `font-weight: ${computedStyle.fontWeight} !important` : '',
                  computedStyle.fontFamily ? `font-family: ${computedStyle.fontFamily} !important` : '',
                  computedStyle.padding ? `padding: ${computedStyle.padding} !important` : '',
                  computedStyle.margin ? `margin: ${computedStyle.margin} !important` : '',
                  computedStyle.borderRadius ? `border-radius: ${computedStyle.borderRadius} !important` : '',
                  computedStyle.borderWidth ? `border-width: ${computedStyle.borderWidth} !important` : '',
                  computedStyle.borderStyle ? `border-style: ${computedStyle.borderStyle} !important` : '',
                  computedStyle.borderColor ? `border-color: ${computedStyle.borderColor} !important` : '',
                  computedStyle.display ? `display: ${computedStyle.display} !important` : '',
                  computedStyle.flexDirection ? `flex-direction: ${computedStyle.flexDirection} !important` : '',
                  computedStyle.alignItems ? `align-items: ${computedStyle.alignItems} !important` : '',
                  computedStyle.justifyContent ? `justify-content: ${computedStyle.justifyContent} !important` : '',
                  computedStyle.gap ? `gap: ${computedStyle.gap} !important` : '',
                  computedStyle.width ? `width: ${computedStyle.width} !important` : '',
                  computedStyle.height ? `height: ${computedStyle.height} !important` : '',
                  computedStyle.textAlign ? `text-align: ${computedStyle.textAlign} !important` : '',
                  computedStyle.lineHeight ? `line-height: ${computedStyle.lineHeight} !important` : '',
                  computedStyle.position ? `position: ${computedStyle.position} !important` : '',
                ].filter(s => s).join('; ');
                
                if (cssText) {
                  el.setAttribute('style', cssText);
                }
              } catch (e) {
                // Stil hesaplanamayan elementleri sessizce atla
              }
            }
          });
        },
      });

      // Scroll pozisyonunu geri yükle
      window.scrollTo(0, scrollY);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = 210;
      const pdfHeight = 297;
      const imgWidth = pdfWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= (pdfHeight - 20);

      while (heightLeft > 0) {
        pdf.addPage();
        position = -(imgHeight - heightLeft) + 10;
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= (pdfHeight - 20);
      }

      const filename = `${idea.title.replace(/[^a-zA-Z0-9_]/g, "_")}_KramerAI.pdf`;
      pdf.save(filename);
      
      toast({
        title: "✅ PDF İndirildi",
        description: `"${idea.title}" başarıyla kaydedildi`,
      });
    } catch (error) {
      console.error("PDF oluşturma hatası:", error);
      toast({
        title: "PDF Hatası",
        description: error instanceof Error ? error.message : "PDF oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto print:max-h-none print:overflow-visible" data-testid="modal-idea-detail">
        <div ref={contentRef} className="print:p-8">
          <DialogHeader>
            <div className="flex items-start justify-between gap-4 flex-wrap print:hidden">
              <div className="flex-1">
                <DialogTitle className="text-2xl font-bold">{idea.title}</DialogTitle>
                <DialogDescription className="text-base mt-2">{idea.description}</DialogDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handlePrint}
                  data-testid="button-print"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Yazdır
                </Button>
                <Button
                  size="sm"
                  variant="default"
                  onClick={handleDownloadPDF}
                  data-testid="button-download-pdf"
                >
                  <Download className="h-4 w-4 mr-2" />
                  PDF İndir
                </Button>
              </div>
            </div>

            <div className="hidden print:block mb-6">
              <h1 className="text-3xl font-bold mb-3">{idea.title}</h1>
              <p className="text-lg text-gray-600">{idea.description}</p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="secondary">{idea.category}</Badge>
              <Badge variant="outline">{idea.budget}</Badge>
              <Badge variant="outline">{idea.complexity}</Badge>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Lightbulb
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < idea.uniqueness ? "text-primary fill-primary" : "text-muted-foreground/30"
                    )}
                  />
                ))}
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Potansiyel Gelir</h3>
              </div>
              <p className="text-sm text-muted-foreground">{idea.potentialRevenue}</p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Hedef Pazar</h3>
              </div>
              <p className="text-sm text-muted-foreground">{idea.targetMarketSize}</p>
            </div>
          </div>

          <Separator />

          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Yol Haritası</h3>
            </div>
            <div className="space-y-4">
              {idea.roadmap.map((phase, index) => (
                <div key={index} className="relative pl-8 pb-4">
                  <div className="absolute left-0 top-1.5 h-full w-0.5 bg-primary/20" />
                  <div className="absolute left-[-4px] top-1.5 h-3 w-3 rounded-full bg-primary" />
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <h4 className="font-semibold text-base">{phase.phase}</h4>
                      <Badge variant="outline" className="text-xs">{phase.duration}</Badge>
                    </div>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {phase.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                <h3 className="font-semibold">Artılar</h3>
              </div>
              <ul className="space-y-2">
                {idea.pros.map((pro, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                <h3 className="font-semibold">Eksiler</h3>
              </div>
              <ul className="space-y-2">
                {idea.cons.map((con, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-red-600 dark:text-red-400 mt-0.5">✗</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-3">Gerekli Beceriler</h3>
            <div className="flex flex-wrap gap-2">
              {idea.requiredSkills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="hidden print:block mt-8 pt-4 border-t text-center text-sm text-gray-500">
            <p>Bu rapor KramerAI tarafından oluşturulmuştur - {new Date().toLocaleDateString("tr-TR")}</p>
          </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
