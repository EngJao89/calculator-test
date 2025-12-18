import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Display initialization', () => {
    it('should initialize with display "0"', () => {
      expect(component.display()).toBe('0');
    });

    it('should initialize with empty history', () => {
      expect(component.history().length).toBe(0);
    });
  });

  describe('inputNumber', () => {
    it('should replace "0" with the input number', () => {
      component.inputNumber('5');
      expect(component.display()).toBe('5');
    });

    it('should append number to existing display', () => {
      component.inputNumber('5');
      component.inputNumber('3');
      expect(component.display()).toBe('53');
    });

    it('should replace display when waiting for new value', () => {
      component.inputNumber('5');
      component.performOperation('+');
      component.inputNumber('3');
      expect(component.display()).toBe('3');
    });
  });

  describe('inputDecimal', () => {
    it('should add decimal point to display', () => {
      component.inputNumber('5');
      component.inputDecimal();
      expect(component.display()).toBe('5.');
    });

    it('should not add duplicate decimal points', () => {
      component.inputNumber('5');
      component.inputDecimal();
      component.inputDecimal();
      expect(component.display()).toBe('5.');
    });

    it('should start with "0." when waiting for new value', () => {
      component.inputNumber('5');
      component.performOperation('+');
      component.inputDecimal();
      expect(component.display()).toBe('0.');
    });
  });

  describe('clear', () => {
    it('should reset display to "0"', () => {
      component.inputNumber('5');
      component.inputNumber('3');
      component.clear();
      expect(component.display()).toBe('0');
    });

    it('should reset previousValue to null', () => {
      component.inputNumber('5');
      component.performOperation('+');
      component.clear();
      expect(component.previousValue()).toBeNull();
    });

    it('should reset operation to null', () => {
      component.inputNumber('5');
      component.performOperation('+');
      component.clear();
      expect(component.operation()).toBeNull();
    });
  });

  describe('calculate', () => {
    it('should add two numbers correctly', () => {
      const result = component.calculate(5, 3, '+');
      expect(result).toBe(8);
    });

    it('should subtract two numbers correctly', () => {
      const result = component.calculate(10, 4, '-');
      expect(result).toBe(6);
    });

    it('should multiply two numbers correctly', () => {
      const result = component.calculate(5, 3, '*');
      expect(result).toBe(15);
    });

    it('should divide two numbers correctly', () => {
      const result = component.calculate(10, 2, '/');
      expect(result).toBe(5);
    });

    it('should return 0 when dividing by zero', () => {
      const result = component.calculate(10, 0, '/');
      expect(result).toBe(0);
    });

    it('should handle decimal results', () => {
      const result = component.calculate(5, 2, '/');
      expect(result).toBe(2.5);
    });
  });

  describe('performOperation', () => {
    it('should store first number when no previous value exists', () => {
      component.inputNumber('5');
      component.performOperation('+');
      expect(component.previousValue()).toBe(5);
      expect(component.operation()).toBe('+');
    });

    it('should calculate and display result when previous value exists', () => {
      component.inputNumber('5');
      component.performOperation('+');
      component.inputNumber('3');
      component.performOperation('*');
      expect(component.display()).toBe('8');
      expect(component.previousValue()).toBe(8);
      expect(component.operation()).toBe('*');
    });

    it('should set waitingForNewValue to true', () => {
      component.inputNumber('5');
      component.performOperation('+');
      expect(component.waitingForNewValue()).toBe(true);
    });
  });

  describe('equals', () => {
    it('should calculate and display result', () => {
      component.inputNumber('5');
      component.performOperation('+');
      component.inputNumber('3');
      component.equals();
      expect(component.display()).toBe('8');
    });

    it('should save calculation to history', () => {
      component.inputNumber('5');
      component.performOperation('+');
      component.inputNumber('3');
      component.equals();
      expect(component.history().length).toBe(1);
      expect(component.history()[0].expression).toBe('5 + 3');
      expect(component.history()[0].result).toBe('8');
    });

    it('should reset previousValue and operation after equals', () => {
      component.inputNumber('5');
      component.performOperation('+');
      component.inputNumber('3');
      component.equals();
      expect(component.previousValue()).toBeNull();
      expect(component.operation()).toBeNull();
    });

    it('should not calculate if no previous value', () => {
      component.inputNumber('5');
      component.equals();
      expect(component.display()).toBe('5');
      expect(component.history().length).toBe(0);
    });

    it('should handle multiple operations in sequence', () => {
      component.inputNumber('10');
      component.performOperation('+');
      component.inputNumber('5');
      component.equals();
      expect(component.display()).toBe('15');

      component.performOperation('*');
      component.inputNumber('2');
      component.equals();
      expect(component.display()).toBe('30');
      expect(component.history().length).toBe(2);
    });
  });

  describe('getOperationSymbol', () => {
    it('should return correct symbol for addition', () => {
      expect(component.getOperationSymbol('+')).toBe('+');
    });

    it('should return correct symbol for subtraction', () => {
      expect(component.getOperationSymbol('-')).toBe('-');
    });

    it('should return correct symbol for multiplication', () => {
      expect(component.getOperationSymbol('*')).toBe('×');
    });

    it('should return correct symbol for division', () => {
      expect(component.getOperationSymbol('/')).toBe('÷');
    });
  });

  describe('clearHistory', () => {
    it('should clear all history', () => {
      component.inputNumber('5');
      component.performOperation('+');
      component.inputNumber('3');
      component.equals();
      expect(component.history().length).toBe(1);

      component.clearHistory();
      expect(component.history().length).toBe(0);
    });
  });

  describe('useHistoryResult', () => {
    it('should set display to history result', () => {
      component.inputNumber('5');
      component.performOperation('+');
      component.inputNumber('3');
      component.equals();
      const result = component.history()[0].result;

      component.clear();
      component.useHistoryResult(result);
      expect(component.display()).toBe('8');
    });

    it('should set waitingForNewValue to true', () => {
      component.useHistoryResult('10');
      expect(component.waitingForNewValue()).toBe(true);
    });
  });

  describe('handleKeyboardEvent', () => {
    it('should handle number keys', () => {
      const event = new KeyboardEvent('keydown', { key: '5' });
      component.handleKeyboardEvent(event);
      expect(component.display()).toBe('5');
    });

    it('should handle addition operator', () => {
      component.inputNumber('5');
      const event = new KeyboardEvent('keydown', { key: '+' });
      component.handleKeyboardEvent(event);
      expect(component.operation()).toBe('+');
    });

    it('should handle subtraction operator', () => {
      component.inputNumber('5');
      const event = new KeyboardEvent('keydown', { key: '-' });
      component.handleKeyboardEvent(event);
      expect(component.operation()).toBe('-');
    });

    it('should handle multiplication operator', () => {
      component.inputNumber('5');
      const event = new KeyboardEvent('keydown', { key: '*' });
      component.handleKeyboardEvent(event);
      expect(component.operation()).toBe('*');
    });

    it('should handle division operator', () => {
      component.inputNumber('5');
      const event = new KeyboardEvent('keydown', { key: '/' });
      component.handleKeyboardEvent(event);
      expect(component.operation()).toBe('/');
    });

    it('should handle Enter key for equals', () => {
      component.inputNumber('5');
      component.performOperation('+');
      component.inputNumber('3');
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      component.handleKeyboardEvent(event);
      expect(component.display()).toBe('8');
    });

    it('should handle = key for equals', () => {
      component.inputNumber('5');
      component.performOperation('+');
      component.inputNumber('3');
      const event = new KeyboardEvent('keydown', { key: '=' });
      component.handleKeyboardEvent(event);
      expect(component.display()).toBe('8');
    });

    it('should handle Escape key for clear', () => {
      component.inputNumber('5');
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      component.handleKeyboardEvent(event);
      expect(component.display()).toBe('0');
    });

    it('should handle Delete key for clear', () => {
      component.inputNumber('5');
      const event = new KeyboardEvent('keydown', { key: 'Delete' });
      component.handleKeyboardEvent(event);
      expect(component.display()).toBe('0');
    });

    it('should handle Backspace key for clear', () => {
      component.inputNumber('5');
      const event = new KeyboardEvent('keydown', { key: 'Backspace' });
      component.handleKeyboardEvent(event);
      expect(component.display()).toBe('0');
    });

    it('should handle decimal point key', () => {
      component.inputNumber('5');
      const event = new KeyboardEvent('keydown', { key: '.' });
      component.handleKeyboardEvent(event);
      expect(component.display()).toBe('5.');
    });

    it('should handle comma as decimal point', () => {
      component.inputNumber('5');
      const event = new KeyboardEvent('keydown', { key: ',' });
      component.handleKeyboardEvent(event);
      expect(component.display()).toBe('5.');
    });
  });

  describe('Complex calculations', () => {
    it('should handle chain of operations', () => {
      component.inputNumber('10');
      component.performOperation('+');
      component.inputNumber('5');
      component.performOperation('*');
      component.inputNumber('2');
      component.equals();
      expect(component.display()).toBe('30');
    });

    it('should handle negative results', () => {
      component.inputNumber('5');
      component.performOperation('-');
      component.inputNumber('10');
      component.equals();
      expect(component.display()).toBe('-5');
    });

    it('should handle decimal calculations', () => {
      component.inputNumber('1');
      component.inputDecimal();
      component.inputNumber('5');
      component.performOperation('+');
      component.inputNumber('2');
      component.inputDecimal();
      component.inputNumber('5');
      component.equals();
      expect(component.display()).toBe('4');
    });
  });

  describe('History management', () => {
    it('should maintain history order (newest first)', () => {
      component.inputNumber('1');
      component.performOperation('+');
      component.inputNumber('1');
      component.equals();

      component.inputNumber('2');
      component.performOperation('+');
      component.inputNumber('2');
      component.equals();

      expect(component.history().length).toBe(2);
      expect(component.history()[0].result).toBe('4');
      expect(component.history()[1].result).toBe('2');
    });

    it('should include timestamp in history entries', () => {
      component.inputNumber('5');
      component.performOperation('+');
      component.inputNumber('3');
      component.equals();

      const historyEntry = component.history()[0];
      expect(historyEntry.timestamp).toBeInstanceOf(Date);
    });
  });
});

