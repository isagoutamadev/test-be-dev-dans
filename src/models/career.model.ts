export interface Career {
    id?: string,
    type?: string,
    url?: string,
    created_at?: string|Date,
    company?: string,
    company_url?: string,
    location?: string,
    title?: string,
    description?: string,
    how_to_apply?: string,
    company_logo?: string,
}

export interface SearchCareer {
    full_time?: string,
    location?: string,
    description?: string,
}