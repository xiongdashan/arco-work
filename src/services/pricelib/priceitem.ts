export default class PriceItem {
  public id = '';

  public ptc = '';

  public baseAmount = 0;

  public surchargeAmount = 0;

  public fee = 0;

  public tax = 0;

  public commission = 0;

  public commissionPercent = 0;

  public paxCount = 0;

  public totalAmount = 0;

  public agencyFee = 0;

  constructor(paxType: string) {
    this.ptc = paxType;
    this.paxCount = 1;
    this.calculate();
  }

  calculate() {
    const total = (this.baseAmount + this.tax + this.fee) * this.paxCount;
    const reduce = this.commission + total * this.commissionPercent;
    this.totalAmount = total - reduce;
  }

  add(count?: number) {
    if (count) {
      this.paxCount = count;
      return;
    }
    this.paxCount += 1;
  }

  reduce() {
    if (this.paxCount === 0) {
      return false;
    }
    this.paxCount -= 1;
    return true;
  }
}
