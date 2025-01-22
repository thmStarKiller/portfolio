import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = 'https://mgqvirhflyzuwczisrvt.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ncXZpcmhmbHl6dXdjemlzcnZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1ODA4NTQsImV4cCI6MjA1MzE1Njg1NH0.L3dhArn0g8haHMhTafKb-lu5rGwaX-mr4dxsQxnywA0' // REPLACE WITH YOUR KEY

// Initialize Supabase
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Review operations
export const reviewService = {
  async getReviews() {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
    
    return { data, error }
  },

  async createReview(review) {
    const { data, error } = await supabase
      .from('reviews')
      .insert([review])
      .select()

    return { data, error }
  }
}

// Utility functions
export const domUtils = {
  createReviewElement(review) {
    const element = document.createElement('div')
    element.className = 'cyber-review'
    element.innerHTML = `
      <div class="review-header">
        <div class="review-avatar" 
             style="background: ${Math.random() > 0.5 ? '#0ff' : '#f0f'}">
        </div>
        <h3>${review.name.toUpperCase()}</h3>
      </div>
      <p>"${review.message}"</p>
      <div class="review-tags">
        <span class="tech-tag">
          ${['⚡ PUSSY ZAPPER', '💀 CUNT SORCERER', '🔥 BIG DICK WIZARD', '👵🏻 VIEJA CULIA', '👁️👄👁️ PUCHAINA NEGRA'][Math.floor(Math.random() * 5)]}
        </span>
      </div>
      <div class="review-timestamp">
        ${new Date(review.created_at).toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </div>
    `
    return element
  },

  showAlert(message, isError = false) {
    const alert = document.createElement('div')
    alert.className = `cyber-alert ${isError ? 'error' : ''}`
    alert.innerHTML = `
      <div class="alert-message">${message}</div>
      <div class="alert-timestamp">
        [SYSTEM TIME: ${new Date().toLocaleTimeString()}]
      </div>
    `
    
    document.body.appendChild(alert)
    setTimeout(() => {
      alert.style.opacity = '0'
      setTimeout(() => alert.remove(), 1000)
    }, 3000)
  }
}