import { voices } from "@/data/voices";
import { VoiceEntry, VoiceStatus } from "@/types";
import { VoiceRepository } from "@/repositories/voice-repository";

export class MockVoiceRepository implements VoiceRepository {
  private entries: VoiceEntry[] = [...voices];

  create(entry: VoiceEntry) {
    this.entries.unshift(entry);
    return entry;
  }

  list() {
    return this.entries;
  }

  getById(id: string) {
    return this.entries.find((entry) => entry.id === id);
  }

  listByOrganization(orgId: string) {
    return this.entries.filter((entry) => entry.organizationId === orgId);
  }

  listByOrganizations(orgIds: string[]) {
    const idSet = new Set(orgIds);
    return this.entries.filter((entry) => idSet.has(entry.organizationId));
  }

  updateStatus(id: string, status: VoiceStatus) {
    const entry = this.getById(id);
    if (!entry) return undefined;
    entry.status = status;
    return entry;
  }
}

export const voiceRepository = new MockVoiceRepository();
