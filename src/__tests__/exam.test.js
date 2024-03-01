const {sum, subtract, multiply, divide} = require('./exam');

/**
 * test : 단일 테스트케이스
 */
test('Exam : adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

/**
 * describe : 테스트를 그룹화 할때 사용
 */
describe('함수 테스트 (describe - 그룹화)', () => {
    test('덧셈 테스트', () => {
        expect(sum(1, 2)).toBe(3);
    });

    test('뺄셈 테스트', () => {
        expect(subtract(10, 5)).toBe(5);
    });

    test('곱하기 테스트', () => {
        expect(multiply(2, 5)).toBe(10);
    });

    test('나누기 테스트', () => {
        expect(divide(10, 2)).toBe(5);
    });
})