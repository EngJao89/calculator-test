import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CalculationHistory {
  expression: string;
  result: string;
  timestamp: Date;
}

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  display = signal('0');
  previousValue = signal<number | null>(null);
  operation = signal<string | null>(null);
  waitingForNewValue = signal(false);
  history = signal<CalculationHistory[]>([]);

  inputNumber(num: string): void {
    if (this.waitingForNewValue()) {
      this.display.set(num);
      this.waitingForNewValue.set(false);
    } else {
      this.display.set(this.display() === '0' ? num : this.display() + num);
    }
  }

  inputDecimal(): void {
    if (this.waitingForNewValue()) {
      this.display.set('0.');
      this.waitingForNewValue.set(false);
    } else if (!this.display().includes('.')) {
      this.display.set(this.display() + '.');
    }
  }

  clear(): void {
    this.display.set('0');
    this.previousValue.set(null);
    this.operation.set(null);
    this.waitingForNewValue.set(false);
  }

  performOperation(nextOperation: string): void {
    const inputValue = Number.parseFloat(this.display());

    if (this.previousValue() === null) {
      this.previousValue.set(inputValue);
    } else if (this.operation()) {
      const result = this.calculate(this.previousValue()!, inputValue, this.operation()!);
      this.display.set(String(result));
      this.previousValue.set(result);
    }

    this.waitingForNewValue.set(true);
    this.operation.set(nextOperation);
  }

  calculate(firstValue: number, secondValue: number, operation: string): number {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return secondValue === 0 ? 0 : firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  }

  equals(): void {
    const inputValue = Number.parseFloat(this.display());
    const prevValue = this.previousValue();
    const op = this.operation();

    if (prevValue !== null && op) {
      const result = this.calculate(prevValue, inputValue, op);
      const resultString = String(result);

      // Salvar no histórico
      const expression = `${prevValue} ${this.getOperationSymbol(op)} ${inputValue}`;
      this.history.update(history => [
        { expression, result: resultString, timestamp: new Date() },
        ...history
      ]);

      this.display.set(resultString);
      this.previousValue.set(null);
      this.operation.set(null);
      this.waitingForNewValue.set(true);
    }
  }

  getOperationSymbol(operation: string): string {
    switch (operation) {
      case '+': return '+';
      case '-': return '-';
      case '*': return '×';
      case '/': return '÷';
      default: return operation;
    }
  }

  clearHistory(): void {
    this.history.set([]);
  }

  useHistoryResult(result: string): void {
    this.display.set(result);
    this.waitingForNewValue.set(true);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    const key = event.key;

    if (key >= '0' && key <= '9') {
      event.preventDefault();
      this.inputNumber(key);
      return;
    }

    switch (key) {
      case '+':
        event.preventDefault();
        this.performOperation('+');
        break;
      case '-':
        event.preventDefault();
        this.performOperation('-');
        break;
      case '*':
        event.preventDefault();
        this.performOperation('*');
        break;
      case '/':
        event.preventDefault();
        this.performOperation('/');
        break;
      case 'Enter':
      case '=':
        event.preventDefault();
        this.equals();
        break;
      case 'Escape':
      case 'Delete':
      case 'Backspace':
        event.preventDefault();
        this.clear();
        break;
      case '.':
      case ',':
        event.preventDefault();
        this.inputDecimal();
        break;
    }
  }
}

