import { shallowMount } from '@vue/test-utils'
import AppComponent from '../components/AppComponent.vue'

describe('AppCompoennt.vueのテスト', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(AppComponent)
  })

  // describe('props', () => {
    it('propsを受け取れれる', () => {
      wrapper.setProps({
        text: 'Hello!'
      })
      expect(wrapper.props().text).toBe('Hello!')
    })
  // })

  // describe('template', () => {
    it('textがレンダリングされる', () => {
      wrapper.setProps({
        text: 'Hi!'
      })
      expect(wrapper.text()).toBe('Hi!')
    })
  // })
})
