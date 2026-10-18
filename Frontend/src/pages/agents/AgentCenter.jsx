import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Activity, Clock, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { agentService } from '../../services/mockServices';

const AgentCenter = () => {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [activityLog, setActivityLog] = useState([
    { time: '21:34:12', agent: 'Demand Agent', action: 'Updated NGO demand forecast.', color: 'bg-blue-500' },
    { time: '21:34:08', agent: 'Matching Agent', action: 'Matched donation FD1024 with Hope NGO.', color: 'bg-green-500' },
    { time: '21:33:51', agent: 'Urgency Agent', action: 'Donation FD1024 classified as HIGH urgency.', color: 'bg-red-500' },
    { time: '21:33:45', agent: 'Logistics Agent', action: 'Optimized route for volunteer Marcus Brody.', color: 'bg-purple-500' },
    { time: '21:33:30', agent: 'Notification Agent', action: 'Sent 5 push notifications to donors.', color: 'bg-amber-500' },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      const data = await agentService.getAgents();
      setAgents(data);
      setLoading(false);
    };
    fetchAgents();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-dark" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">FoodBridge Intelligence</h1>
        <p className="text-gray-500">Autonomous coordination across the food redistribution network.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Agent Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {agents.map(agent => (
              <motion.div
                key={agent.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedAgent(selectedAgent?.id === agent.id ? null : agent)}
                className={`cursor-pointer p-6 rounded-2xl border transition-all ${selectedAgent?.id === agent.id
                    ? 'bg-brand-dark text-white border-brand-dark'
                    : 'bg-white dark:bg-charcoal-darker border-gray-200 dark:border-charcoal-medium hover:shadow-lg'
                  }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold">{agent.name}</h3>
                  <div className={`w-3 h-3 rounded-full ${agent.status === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="opacity-70">Tasks Today</div>
                    <div className="font-bold text-lg">{agent.tasksToday}</div>
                  </div>
                  <div>
                    <div className="opacity-70">Success Rate</div>
                    <div className="font-bold text-lg">{agent.successRate}</div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-charcoal-medium text-xs opacity-70">
                  {agent.lastAction}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Side Panel: Agent Detail + Activity */}
        <div className="space-y-4">
          {/* Agent Detail */}
          {selectedAgent && (
            <Card className="p-6 bg-brand-dark/5 dark:bg-charcoal-dark border-brand-dark/20">
              <h3 className="font-bold mb-4">{selectedAgent.name}</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-gray-500">Objective</div>
                  <div>{selectedAgent.purpose}</div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <Badge variant={selectedAgent.status === 'Active' ? 'success' : 'default'}>{selectedAgent.status}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Confidence</span>
                  <span className="font-bold">{selectedAgent.confidenceRating}</span>
                </div>
              </div>
            </Card>
          )}

          {/* Activity Feed */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Live Activity</h3>
              <Badge variant="success">● Live</Badge>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {activityLog.map((log, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <div className="flex flex-col items-center">
                    <div className={`w-2 h-2 rounded-full ${log.color} mt-1.5`} />
                    {i < activityLog.length - 1 && <div className="w-0.5 h-full bg-gray-200 dark:bg-charcoal-medium mt-1" />}
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">{log.time}</div>
                    <div className="font-medium">{log.agent}</div>
                    <div className="text-gray-500">{log.action}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AgentCenter;
