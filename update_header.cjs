const fs = require('fs');

let content = fs.readFileSync('src/views/Finance.tsx', 'utf8');

const importReplacement = `import { Download } from 'lucide-react';
import { cn } from '../lib/utils';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';`;

content = content.replace("import { cn } from '../lib/utils';", importReplacement);

const pdfFunction = `
  const generateReport = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.text('Financial Report', 14, 22);
    
    doc.setFontSize(11);
    doc.text(\`Generated on: \${new Date().toLocaleDateString()}\`, 14, 30);

    // Summary Section
    doc.setFontSize(14);
    doc.text('Financial Summary', 14, 45);
    
    autoTable(doc, {
      startY: 50,
      head: [['Total Revenue', 'Total Profit', 'Profit Margin']],
      body: [
        [
          \`$\${totalRevenue.toLocaleString()}\`, 
          \`$\${totalProfit.toLocaleString()}\`,
          \`\${Math.round((totalProfit / totalRevenue) * 100)}%\`
        ]
      ],
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] }
    });

    // Mobile Money Accounts
    let currentY = (doc).lastAutoTable.finalY + 15;
    doc.setFontSize(14);
    doc.text('Mobile Money Accounts', 14, currentY);
    
    autoTable(doc, {
      startY: currentY + 5,
      head: [['Provider', 'Account Name', 'Number', 'Balance']],
      body: accounts.map(a => [
        a.provider, 
        a.name, 
        a.number, 
        \`$\${a.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}\`
      ]),
      theme: 'striped',
      headStyles: { fillColor: [39, 174, 96] }
    });

    // Expenses
    currentY = (doc).lastAutoTable.finalY + 15;
    if (currentY > 250) {
      doc.addPage();
      currentY = 20;
    }
    
    doc.setFontSize(14);
    doc.text('Recent Expenses', 14, currentY);
    
    autoTable(doc, {
      startY: currentY + 5,
      head: [['Date', 'Category', 'Description', 'Amount', 'Status']],
      body: expenses.map(e => [
        e.date, 
        e.category, 
        e.description, 
        \`$\${e.amount.toLocaleString()}\`,
        e.status
      ]),
      theme: 'striped',
      headStyles: { fillColor: [231, 76, 60] }
    });

    // Recent Transactions
    currentY = (doc).lastAutoTable.finalY + 15;
    if (currentY > 250) {
      doc.addPage();
      currentY = 20;
    }
    
    doc.setFontSize(14);
    doc.text('Recent Transactions', 14, currentY);
    
    autoTable(doc, {
      startY: currentY + 5,
      head: [['Account', 'Type', 'Party', 'Amount', 'Date']],
      body: recentTransactions.map(t => [
        t.account, 
        t.type, 
        t.from || t.to || '', 
        \`$\${t.amount.toLocaleString()}\`,
        t.date
      ]),
      theme: 'striped',
      headStyles: { fillColor: [142, 68, 173] }
    });

    doc.save('financial-report.pdf');
  };
`;

content = content.replace("  const totalProfit = mockBranches.reduce((sum, b) => sum + b.profit, 0);", "  const totalProfit = mockBranches.reduce((sum, b) => sum + b.profit, 0);\n" + pdfFunction);

const oldHeader = `        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button`;

const newHeader = `        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button`;

content = content.replace(oldHeader, newHeader);

const oldHeaderClose = `          <button
            onClick={() => setActiveTab('mobile_money')}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeTab === 'mobile_money' ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            )}
          >
            Mobile Money
          </button>
        </div>
      </div>`;

const newHeaderClose = `          <button
            onClick={() => setActiveTab('mobile_money')}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeTab === 'mobile_money' ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            )}
          >
            Mobile Money
          </button>
        </div>
        
        <button 
          onClick={generateReport}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm w-full sm:w-auto shrink-0"
        >
          <Download className="w-4 h-4" />
          Download Report
        </button>
      </div>
    </div>`;

content = content.replace(oldHeaderClose, newHeaderClose);

fs.writeFileSync('src/views/Finance.tsx', content);

