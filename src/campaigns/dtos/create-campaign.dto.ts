export class CreateCampaignDto {
  readonly name!: string;
  readonly advertiserId!: string;
  readonly previewUrl!: string;
  readonly trackingUrl!: string;
  readonly runFrequency!: string;
  readonly parameters!: Record<string, string>;
}
