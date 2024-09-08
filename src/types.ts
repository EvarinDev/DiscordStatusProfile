interface DiscordUser {
    username: string;
    public_flags: number;
    id: string;
    global_name: string;
    display_name: string;
    discriminator: string;
    clan: string | null;
    bot: boolean;
    avatar_decoration_data: string | null;
    avatar: string;
}

interface ActivityAsset {
    small_text: string;
    small_image: string;
    large_text: string;
    large_image: string;
}

interface ActivityTimestamp {
    start: number;
}

interface Activity {
    type: number;
    state: string;
    name: string;
    id: string;
    created_at: number;
    timestamps?: ActivityTimestamp;
    session_id?: string;
    flags?: number;
    details?: string;
    assets?: ActivityAsset;
    application_id?: string;
}

interface IDiscordData {
    discord_user: DiscordUser;
    spotify: string | null;
    status: string;
    activities: Activity[];
    active_on_discord_web: boolean;
    active_on_discord_desktop: boolean;
    active_on_discord_mobile: boolean;
    listening_to_spotify: boolean;
}
export type { DiscordUser, IDiscordData, Activity, ActivityAsset, ActivityTimestamp };