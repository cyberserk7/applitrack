"use client";

import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { DocumentType } from "@/models/Document";
import { DocumentSection } from "./_components/document-section";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentType[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await axios.get("/api/get-documents");
        if (res.status === 200) {
          setDocuments(res.data.documents);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDocuments();
  }, []);

  console.log(documents);

  return (
    <div className="h-full p-3 xl:p-10 space-y-5 w-full">
      <Suspense>
        <DocumentSection documents={documents} />
      </Suspense>
    </div>
  );
}
