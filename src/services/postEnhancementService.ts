
interface EnhancementSuggestion {
  type: 'grammar' | 'style' | 'hashtags' | 'emojis';
  original: string;
  suggestion: string;
  reason: string;
}

export const enhancePost = (content: string): EnhancementSuggestion[] => {
  const suggestions: EnhancementSuggestion[] = [];
  
  // Basic grammar and style checks
  if (!content.endsWith('.') && !content.endsWith('!') && !content.endsWith('?')) {
    suggestions.push({
      type: 'grammar',
      original: content,
      suggestion: content + '.',
      reason: 'Adding proper punctuation improves readability.'
    });
  }

  // Add relevant hashtags based on content
  const keywords = content.toLowerCase().split(' ');
  const relevantHashtags = new Set<string>();
  
  if (keywords.some(word => word.includes('vampire') || word.includes('blood'))) {
    relevantHashtags.add('#VampireLife');
    relevantHashtags.add('#BloodDolls');
  }
  
  if (keywords.some(word => word.includes('club') || word.includes('party'))) {
    relevantHashtags.add('#NightLife');
    relevantHashtags.add('#VirtualParty');
  }
  
  if (keywords.some(word => word.includes('magic') || word.includes('spell'))) {
    relevantHashtags.add('#DarkMagic');
    relevantHashtags.add('#Occult');
  }
  
  if (relevantHashtags.size > 0) {
    suggestions.push({
      type: 'hashtags',
      original: content,
      suggestion: `${content} ${Array.from(relevantHashtags).join(' ')}`,
      reason: 'Adding relevant hashtags increases post visibility.'
    });
  }

  // Add thematic emojis
  const thematicEmojis = new Map([
    ['blood', '🩸'],
    ['vampire', '🧛'],
    ['magic', '✨'],
    ['party', '🎉'],
    ['club', '🎵'],
    ['night', '🌙'],
  ]);
  
  const suggestedEmojis = new Set<string>();
  keywords.forEach(word => {
    thematicEmojis.forEach((emoji, keyword) => {
      if (word.includes(keyword)) {
        suggestedEmojis.add(emoji);
      }
    });
  });
  
  if (suggestedEmojis.size > 0) {
    suggestions.push({
      type: 'emojis',
      original: content,
      suggestion: `${Array.from(suggestedEmojis).join('')} ${content}`,
      reason: 'Adding thematic emojis makes your post more engaging.'
    });
  }

  return suggestions;
};
