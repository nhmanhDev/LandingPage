import { supabase } from '../supabase/client';

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  domain: string; // To filter blogs by domain (ai, invest, studio, mmo)
  created_at: string;
}

export const BlogService = {
  async getBlogsByDomain(domain: string): Promise<Blog[]> {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('domain', domain)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching blogs:', error);
      return [];
    }
    return data as Blog[];
  },

  async getBlogBySlug(slug: string): Promise<Blog | null> {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching blog:', error);
      return null;
    }
    return data as Blog;
  }
};
