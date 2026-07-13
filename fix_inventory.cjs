const fs = require('fs');

let content = fs.readFileSync('src/views/Inventory.tsx', 'utf8');

const oldListItem = `<div className="flex justify-between items-start mb-1">
                  <div className={\`font-semibold \${selectedItem === item.id ? 'text-blue-900' : 'text-gray-900'}\`}>
                    {item.name}
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">{item.category}</span>
                  <span className={\`font-bold \${item.remainingQty > 10 ? 'text-green-600' : item.remainingQty > 0 ? 'text-orange-500' : 'text-red-500'}\`}>
                    {item.remainingQty} left
                  </span>
                </div>`;

const newListItem = `<div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-3">
                    {/* @ts-ignore */}
                    {item.image ? (
                      // @ts-ignore
                      <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        <Box className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                    <div>
                      <div className={\`font-semibold truncate w-32 sm:w-40 \${selectedItem === item.id ? 'text-blue-900' : 'text-gray-900'}\`}>
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500">{item.category}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={\`text-[10px] font-bold px-2 py-0.5 rounded-md \${item.remainingQty > 10 ? 'bg-green-100 text-green-700' : item.remainingQty > 0 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}\`}>
                      {item.remainingQty} left
                    </span>
                  </div>
                </div>`;

content = content.replace(oldListItem, newListItem);

const oldDetailsHeader = `<div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{currentItem.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">Pricing & Value Analysis</p>
                    </div>
                    <div className="px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100 text-sm font-medium text-gray-700">
                      Margin: {Math.round((currentItem.sellPrice - currentItem.unitCost) / currentItem.sellPrice * 100)}%
                    </div>
                  </div>`;

const newDetailsHeader = `<div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      {/* @ts-ignore */}
                      {currentItem.image ? (
                        // @ts-ignore
                        <img src={currentItem.image} alt={currentItem.name} className="w-16 h-16 rounded-xl object-cover shadow-sm" />
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center shadow-sm">
                          <Box className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{currentItem.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">Pricing & Value Analysis</p>
                      </div>
                    </div>
                    <div className="px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100 text-sm font-medium text-gray-700">
                      Margin: {Math.round((currentItem.sellPrice - currentItem.unitCost) / currentItem.sellPrice * 100)}%
                    </div>
                  </div>`;

content = content.replace(oldDetailsHeader, newDetailsHeader);

fs.writeFileSync('src/views/Inventory.tsx', content);

