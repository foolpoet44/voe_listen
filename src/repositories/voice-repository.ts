import { VoiceEntry, VoiceStatus } from "@/types";

export interface VoiceRepository {
  create(entry: VoiceEntry): VoiceEntry;
  list(): VoiceEntry[];
  getById(id: string): VoiceEntry | undefined;
  listByOrganization(orgId: string): VoiceEntry[];
  listByOrganizations(orgIds: string[]): VoiceEntry[];
  updateStatus(id: string, status: VoiceStatus): VoiceEntry | undefined;
}
