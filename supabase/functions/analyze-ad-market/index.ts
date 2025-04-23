
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      'https://aljcowxubzytfnjjybhn.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsamNvd3h1Ynp5dGZuamp5YmhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMzQ4ODgsImV4cCI6MjA2MDYxMDg4OH0.YBenBK0T_vgom3VPDgN9Bvzri3tBE1mLwclSF1lBAGM'
    )

    // Analyze market trends and generate opportunities
    const categories = ['social-media', 'in-app', 'banner', 'sponsored-content']
    const opportunities = []

    for (const category of categories) {
      // Simulate AI analysis of market conditions
      const demandScore = Math.random() * 5 + 5 // Score between 5-10
      const priceTrend = Math.random() * 100 + 50 // Price between 50-150
      const competition = ['low', 'medium', 'high'][Math.floor(Math.random() * 3)]

      // Store market analysis
      const { data: analysisData, error: analysisError } = await supabase
        .from('ad_market_analysis')
        .insert({
          category,
          demand_score: demandScore,
          price_trend: priceTrend,
          competition_level: competition
        })
        .select()
        .single()

      if (analysisError) throw analysisError

      // Generate ad opportunities based on analysis
      const suggestedPrice = priceTrend * (demandScore / 10)
      const estimatedReach = Math.floor(Math.random() * 10000 + 5000)
      
      const { data: opportunityData, error: opportunityError } = await supabase
        .from('ad_opportunities')
        .insert({
          category,
          placement_type: category,
          suggested_price: suggestedPrice,
          estimated_reach: estimatedReach,
          duration_days: 30,
          ai_confidence_score: demandScore / 10
        })
        .select()
        .single()

      if (opportunityError) throw opportunityError
      opportunities.push(opportunityData)
    }

    return new Response(JSON.stringify({ success: true, opportunities }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
