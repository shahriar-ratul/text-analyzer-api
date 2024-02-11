import { TextAnalysis, Upload } from "@prisma/client";

export class TextAnalysisEntity implements TextAnalysis {
    id: number;
    uploadId: number;
    text: string;
    longestWord: string;
    numberOfCharacters: number;
    numberOfWords: number;
    numberOfParagraphs: number;
    numberOfSentences: number;
    upload: Upload;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
