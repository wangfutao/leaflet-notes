import { shallowMount } from '@vue/test-utils'

describe('HelloWorld.vue', () => {
  it('should ', function () {
    let t = 0;
    setInterval(()=>{
      console.log(t++)
    }, 1000)
  });
})
