const fs = require('fs');

let content = fs.readFileSync('src/views/Dashboard.tsx', 'utf8');

const activityFeedCode = `      {/* Activity Feed Row */}
      <div className="grid grid-cols-1 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7, ease: 'easeOut' }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Recent Activity Feed</h3>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View all</button>
          </div>
          <div className="space-y-6">
            {[
              { id: 1, user: 'Sarah Jenkins', action: 'updated branch details for', target: 'Downtown HQ', time: 'Just now', initial: 'SJ', color: 'bg-blue-100 text-blue-600' },
              { id: 2, user: 'Michael Chen', action: 'approved an expense of', target: '$450.00', time: '10 mins ago', initial: 'MC', color: 'bg-green-100 text-green-600' },
              { id: 3, user: 'Amina Ali', action: 'processed a new sale at', target: 'Westside Plaza', time: '1 hour ago', initial: 'AA', color: 'bg-purple-100 text-purple-600' },
              { id: 4, user: 'System', action: 'completed automated backup', target: 'Database', time: '3 hours ago', initial: 'SY', color: 'bg-gray-100 text-gray-600' },
              { id: 5, user: 'David Rodriguez', action: 'added a new team member to', target: 'North Hills', time: '5 hours ago', initial: 'DR', color: 'bg-orange-100 text-orange-600' },
            ].map((activity, idx) => (
              <div key={activity.id} className="flex gap-4">
                <div className={\`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 \${activity.color}\`}>
                  {activity.initial}
                </div>
                <div className="flex-1 pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="text-sm text-gray-900 mb-1">
                    <span className="font-semibold">{activity.user}</span> {activity.action} <span className="font-semibold">{activity.target}</span>
                  </div>
                  <div className="text-xs text-gray-500">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>`;

content = content.replace('      </div>\n    </div>\n  );\n}', '      </div>\n' + activityFeedCode + '\n    </div>\n  );\n}');

fs.writeFileSync('src/views/Dashboard.tsx', content);

