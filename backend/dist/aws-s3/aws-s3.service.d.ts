type UploadFileParams = {
    key: string;
    buffer: Buffer;
    contentType?: string;
};
export declare function uploadFile({ key, buffer, contentType, }: UploadFileParams): Promise<string>;
export declare function deleteFile(key: string): Promise<void>;
export {};
//# sourceMappingURL=aws-s3.service.d.ts.map