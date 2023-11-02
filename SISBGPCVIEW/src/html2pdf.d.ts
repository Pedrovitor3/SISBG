declare module 'html2pdf.js' {
  const html2pdf: {
    (): {
      from: (element: HTMLElement) => {
        set: (options: {
          margin?: number | number[];
          filename?: string;
          image?: { type: 'jpeg' | 'png' | 'string'; quality: number };
          html2canvas?: { scale: number };
          jsPDF?: { unit: string; format: string; orientation: string };
        }) => {
          output: any;
          outputPdf(): any;
          save: () => void;
        };
      };
    };
  };

  export = html2pdf;
}
