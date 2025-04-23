
import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { supabase } from '@/integrations/supabase/client'
import { BarChart, RefreshCw, TrendingUp } from 'lucide-react'

export const AIAdvertisingManager = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [opportunities, setOpportunities] = useState([])

  const runMarketAnalysis = async () => {
    try {
      setIsAnalyzing(true)
      const { data, error } = await supabase.functions.invoke('analyze-ad-market')
      
      if (error) throw error

      setOpportunities(data.opportunities)
      toast.success('Market analysis completed successfully')
    } catch (error) {
      console.error('Error running market analysis:', error)
      toast.error('Failed to analyze market')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          AI Advertising Manager
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button 
            onClick={runMarketAnalysis} 
            disabled={isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Market...
              </>
            ) : (
              <>
                <BarChart className="mr-2 h-4 w-4" />
                Run Market Analysis
              </>
            )}
          </Button>

          {opportunities.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-medium">Latest Opportunities</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {opportunities.map((opp: any) => (
                  <Card key={opp.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium capitalize">{opp.category}</h4>
                        <p className="text-sm text-muted-foreground">
                          Estimated reach: {opp.estimated_reach.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ${opp.suggested_price.toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {opp.duration_days} days
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                          <div 
                            className="h-full bg-green-500 transition-all"
                            style={{ width: `${opp.ai_confidence_score * 100}%` }}
                          />
                        </div>
                        <span className="text-sm">
                          {(opp.ai_confidence_score * 100).toFixed(0)}%
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        AI Confidence Score
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
