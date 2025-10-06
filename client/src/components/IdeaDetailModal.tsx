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

interface IdeaDetailModalProps {
  idea: Idea | null;
  isOpen: boolean;
  onClose: () => void;
}

export function IdeaDetailModal({ idea, isOpen, onClose }: IdeaDetailModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  if (!idea) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;

    try {
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${idea.title.replace(/\s+/g, "_")}_KramerAI.pdf`);
    } catch (error) {
      console.error("PDF oluşturma hatası:", error);
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
      </DialogContent>
    </Dialog>
  );
}
