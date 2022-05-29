import PriceGroup from './pricegroup';

export default class PriceCalculator {
  private receivable: PriceGroup;

  private payable: PriceGroup;

  public ReceiveablePrice = 0;

  public PayablePrice = 0;

  public Profit = 0;

  public PaxTypeCount = 0;

  public PaxTypeDict: Record<string, number> = {};

  constructor(receivable: PriceGroup, payable: PriceGroup) {
    this.payable = payable;
    this.receivable = receivable;
  }

  addItem(paxType: string, count?: number) {
    this.receivable.addItem(paxType, count);
    this.payable.addItem(paxType, count);
    this.calculator();
  }

  reduceItem(paxType: string) {
    this.payable.reduceItem(paxType);
    this.receivable.reduceItem(paxType);
    this.calculator();
  }

  calculator() {
    this.receivable.calculator();
    this.payable.calculator();
    this.ReceiveablePrice = this.receivable.SummaryItem.totalAmount;
    this.PayablePrice = this.payable.SummaryItem.totalAmount;
    this.Profit = this.ReceiveablePrice - this.PayablePrice;
    this.PaxTypeCount = this.receivable.PaxTypeCount;
  }

  tidyPaxType(paxTypes: string[]) {
    this.PaxTypeDict = {};
    paxTypes.forEach((p) => {
      const val = this.PaxTypeDict[p];
      if (val) {
        this.PaxTypeDict[p] = val + 1;
        return;
      }
      this.PaxTypeDict[p] = 1;
    });
  }

  Set(paxTypes: string[]) {
    this.tidyPaxType(paxTypes);
    this.receivable.prune(this.PaxTypeDict);
    this.payable.prune(this.PaxTypeDict);
    Object.keys(this.PaxTypeDict).forEach((p) => {
      this.addItem(p, this.PaxTypeDict[p]);
    });
  }

  HasType() {
    return Object.keys(this.PaxTypeDict).length > 0;
  }
}
