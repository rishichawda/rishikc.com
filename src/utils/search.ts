import DOMPurify from 'dompurify';

export interface SearchableItem {
    searchableContent: string;
}

export interface ArticleItem extends SearchableItem {
    id: string;
    title: string;
    description: string;
    subtitle: string;
    path: string;
    date: string;
    hero_image: { src: string };
    hero_image_alt: string;
    tags: string[];
}

export interface GalleryItem extends SearchableItem {
    id: string;
    title: string;
    description: string;
    location: string;
    directory: string;
    featured_image: { src: string };
    featured_image_alt: string;
    images_count: number;
}

export interface QuoteItem extends SearchableItem {
    id: string;
    quote: string;
    info: string;
}

export interface SearchResults {
    articles: ArticleItem[];
    gallery: GalleryItem[];
    quotes: QuoteItem[];
}

export interface SearchIndex {
    articles: ArticleItem[];
    gallery: GalleryItem[];
    quotes: QuoteItem[];
}

export interface SearchRenderer {
    showDefaultState(): void;
    displayResults(query: string, results: SearchResults): void;
    hideAllSections(): void;
    displayArticles(articles: ArticleItem[]): void;
    displayGallery(gallery: GalleryItem[]): void;
    displayQuotes(quotes: QuoteItem[]): void;
}

// Extend Window interface to include searchIndex
declare global {
    interface Window {
        searchIndex: SearchIndex;
        clientSideSearchInstance?: ClientSideSearch;
    }
}

export class ClientSideSearch {
    private searchInput!: HTMLInputElement;
    private searchForm!: HTMLFormElement;
    private renderer: SearchRenderer;
    
    private currentResults: SearchResults = { articles: [], gallery: [], quotes: [] };
    private searchTimeout: number | null = null;
    
    // Store bound event listeners for cleanup
    private boundFormSubmit!: (e: Event) => void;
    private boundInputHandler!: () => void;
    private boundKeydownHandler!: (e: KeyboardEvent) => void;
    private boundPopstateHandler!: () => void;
    
    constructor(renderer: SearchRenderer) {
        this.renderer = renderer;
        
        // Check if required elements exist
        const searchInput = document.getElementById('search-input') as HTMLInputElement;
        const searchForm = document.getElementById('search-form') as HTMLFormElement;
        
        if (!searchInput || !searchForm) {
            console.warn('Required search elements not found');
            return;
        }
        
        this.searchInput = searchInput;
        this.searchForm = searchForm;
        
        // Bind event handlers
        this.boundFormSubmit = (e: Event) => {
            e.preventDefault();
            this.performSearch();
        };
        
        this.boundInputHandler = () => {
            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout);
            }
            this.searchTimeout = window.setTimeout(() => this.performSearch(), 300);
        };
        
        this.boundKeydownHandler = (e: KeyboardEvent) => {
            if (e.key === '/' && e.target !== this.searchInput) {
                e.preventDefault();
                this.searchInput.focus();
            }
            
            if (e.key === 'Escape' && e.target === this.searchInput) {
                this.searchInput.blur();
            }
        };
        
        this.boundPopstateHandler = () => {
            this.initializeFromURL();
        };
        
        this.setupEventListeners();
        this.initializeFromURL();
    }
    
    private setupEventListeners(): void {
        this.searchForm.addEventListener('submit', this.boundFormSubmit);
        this.searchInput.addEventListener('input', this.boundInputHandler);
        document.addEventListener('keydown', this.boundKeydownHandler);
        window.addEventListener('popstate', this.boundPopstateHandler);
    }
    
    public destroy(): void {
        this.searchForm.removeEventListener('submit', this.boundFormSubmit);
        this.searchInput.removeEventListener('input', this.boundInputHandler);
        document.removeEventListener('keydown', this.boundKeydownHandler);
        window.removeEventListener('popstate', this.boundPopstateHandler);
        
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = null;
        }
    }
    
    public initializeFromURL(): void {
        const urlParams = new URLSearchParams(window.location.search);
        const rawQuery = urlParams.get('q') || '';
        const query = this.sanitizeInput(rawQuery);
        this.searchInput.value = query;
        
        // Ensure we've loaded the search index before proceeding
        if (!window.searchIndex) {
            console.warn('Search index not available when initializing from URL');
            return;
        }
        
        if (query) {
            // Small delay to ensure DOM is ready, especially on page reload
            setTimeout(() => this.performSearch(false), 10); // Don't update URL since we're initializing from it
        } else {
            this.renderer.showDefaultState();
        }
        
        // Auto-focus if no query
        if (!query.trim()) {
            setTimeout(() => this.searchInput.focus(), 500);
        }
    }
    
    private updateURL(query: string): void {
        const url = new URL(window.location.href);
        if (query.trim()) {
            url.searchParams.set('q', query);
        } else {
            url.searchParams.delete('q');
        }
        window.history.pushState({}, '', url);
    }
    
    private performSearch(updateURL: boolean = true): void {
        const rawQuery = this.searchInput.value.trim();
        const query = this.sanitizeInput(rawQuery);
        
        // Update input with sanitized query if different
        if (query !== rawQuery) {
            this.searchInput.value = query;
        }
        
        if (updateURL) {
            this.updateURL(query);
        }
        
        if (!query) {
            this.renderer.showDefaultState();
            return;
        }
        
        this.currentResults = this.searchContent(query);
        this.renderer.displayResults(query, this.currentResults);
    }
    
    private searchContent(query: string): SearchResults {
        const searchTerm = query.toLowerCase();
        
        // Search articles
        const articles = window.searchIndex.articles.filter((article: ArticleItem) => 
            article.searchableContent.includes(searchTerm)
        );
        
        // Search gallery
        const gallery = window.searchIndex.gallery.filter((item: GalleryItem) => 
            item.searchableContent.includes(searchTerm)
        );
        
        // Search quotes
        const quotes = window.searchIndex.quotes.filter((quote: QuoteItem) => 
            quote.searchableContent.includes(searchTerm)
        );
        
        return { articles, gallery, quotes };
    }
    
    public sanitizeInput(input: string): string {
        if (typeof input !== 'string') return '';
        
        // Use DOMPurify to sanitize text content
        // For search queries, we want plain text only, no HTML
        const sanitized = DOMPurify.sanitize(input, { 
            ALLOWED_TAGS: [], // No HTML tags allowed
            ALLOWED_ATTR: [] // No attributes allowed
        });
        
        return sanitized
            .trim()
            .slice(0, 200); // Limit query length for performance
    }

    public sanitizeHtml(html: string): string {
        if (typeof html !== 'string') return '';
        
        // Use DOMPurify with safe defaults for HTML content
        return DOMPurify.sanitize(html, {
            ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'span'],
            ALLOWED_ATTR: ['class']
        });
    }

    public escapeForAttribute(value: string): string {
        if (typeof value !== 'string') return '';
        
        // For HTML attributes, we need basic escaping
        return DOMPurify.sanitize(value, { 
            ALLOWED_TAGS: [],
            ALLOWED_ATTR: []
        }).replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
    }

    public formatDate(dateString: string): string {
        return new Date(dateString).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
                        year: "numeric",
        });
    }
}    // Singleton initialization function to prevent multiple instances
export function initializeSearch(renderer: SearchRenderer): ClientSideSearch | null {
    // Clean up existing instance if it exists
    if (window.clientSideSearchInstance) {
        window.clientSideSearchInstance.destroy();
        window.clientSideSearchInstance = undefined;
    }
    
    // Check if search index is available
    if (!window.searchIndex) {
        console.warn('Search index not available');
        return null;
    }
    
    // Create new instance
    try {
        const instance = new ClientSideSearch(renderer);
        window.clientSideSearchInstance = instance;
        return instance;
    } catch (error) {
        console.error('Failed to initialize search:', error);
        return null;
    }
}
