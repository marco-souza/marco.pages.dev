export type TrackDownloadStatus = "pending" | "completed" | "failed";

export type TrackDownloadDTO = {
  youtubeUrl: string;
  status: TrackDownloadStatus;
};
