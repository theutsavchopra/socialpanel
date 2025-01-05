import { useWalletStore } from '@/stores/walletStore';
import { formatPrice, formatDate } from '@/lib/utils';
import { ArrowUpRight, ArrowDownRight, CreditCard, Bitcoin } from 'lucide-react';

export default function TransactionList() {
  const { transactions, isLoading } = useWalletStore();

  if (isLoading) {
    return <div className="text-center py-8">Loading transactions...</div>;
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No transactions yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg border"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              transaction.type === 'deposit' 
                ? 'bg-green-50' 
                : 'bg-red-50'
            }`}>
              {transaction.type === 'deposit' ? (
                <ArrowUpRight className={`h-5 w-5 ${
                  transaction.type === 'deposit' 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`} />
              ) : (
                <ArrowDownRight className="h-5 w-5 text-red-600" />
              )}
            </div>
            <div>
              <p className="font-medium text-gray-900">
                {transaction.type === 'deposit' ? 'Loaded Funds' : 'Payment'}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{formatDate(transaction.createdAt)}</span>
                {transaction.paymentMethod && (
                  <>
                    <span>•</span>
                    {transaction.paymentMethod === 'stripe' ? (
                      <div className="flex items-center gap-1">
                        <CreditCard className="h-3 w-3" />
                        <span>Card</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <Bitcoin className="h-3 w-3" />
                        <span>Crypto</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={`font-medium ${
            transaction.type === 'deposit' 
              ? 'text-green-600' 
              : 'text-red-600'
          }`}>
            {transaction.type === 'deposit' ? '+' : '-'}
            {formatPrice(transaction.amount)}
          </div>
        </div>
      ))}
    </div>
  );
}
