import { sortObject } from './sort-object'

describe('Sort object', () => {
  it('should return the same object with its keys sorted', () => {
    const obj = sortObject({
      lorem: 123,
      ispum: 'test',
      doloris: {
        sit: true,
        amet: false
      }
    })

    expect(JSON.stringify(obj)).toBe('{"doloris":{"sit":true,"amet":false},"ispum":"test","lorem":123}')
  })

  it('should return the same object with its keys deeply sorted', () => {
    const obj = sortObject(
      {
        lorem: 123,
        ispum: 'test',
        doloris: {
          sit: true,
          amet: false
        }
      },
      true
    )

    expect(JSON.stringify(obj)).toBe('{"doloris":{"amet":false,"sit":true},"ispum":"test","lorem":123}')
  })
})
