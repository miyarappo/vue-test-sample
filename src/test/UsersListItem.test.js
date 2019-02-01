import { shallowMount } from '@vue/test-utils'
import UsersListItem from '../components/UsersListItem.vue'
import { wrap } from 'module';

describe('UsersListItem.vue', () => {
  let wrapper

  beforeEach(() => {
    const requireProps = { id: 0 }
    wrapper = shallowMount(UsersListItem, {propsData: requireProps})
  })

  describe('props', () => {
    it('propsを受け取れる', () => {
      wrapper.setProps({
        id: 0,
        firstName: 'Taro',
        lastName: 'Miyata',
        gender: 'male'
      })
      expect(wrapper.vm.$props.id).toBe(0)
      expect(wrapper.vm.$props.firstName).toBe('Taro')
      expect(wrapper.vm.$props.lastName).toBe('Miyata')
      expect(wrapper.vm.$props.gender).toBe('male')
    })
    it('propsの型が正しいか', () => {
      wrapper.setProps({
        id: 0,
        firstName: 'Taro',
        lastName: 'Miyata',
        gender: 'male'
      })
      expect(typeof wrapper.vm.$props.id).toBe('number')
      expect(typeof wrapper.vm.$props.firstName).toBe('string')
      expect(typeof wrapper.vm.$props.lastName).toBe('string')
      expect(typeof wrapper.vm.$props.gender).toBe('string')
    })
    it('requiredがtrue', () => {
      const { id } = wrapper.vm.$options.props
      expect(id.required).toBe(true)
    })
    it('typeがNumber', () => {
      const { id } = wrapper.vm.$options.props
      expect(id.type).toBe(Number)
    })
  })

  describe('computed', () => {
    it('lastNameとfirstNameを連結した値が返ってくる', () => {
      wrapper.setProps({
        firstName: 'Test',
        lastName: 'Test!!!',
        gender: 'male'
      })
      expect(wrapper.vm.fullName).toBe('Test Test!!!')
    })
    it('isMaleが正しい値を返すか', () => {
      wrapper.setProps({
        gender: 'male'
      })
      expect(wrapper.vm.isMale).toBe(true)
      expect(wrapper.vm.isFemale).toBe(false)
    })
  })

  describe(':class', () => {
    it('genderがmaleの時に_maleクラスが付与されていること', () => {
      wrapper.setProps({
        gender: 'male'
      })
      expect(wrapper.classes()).toContain('_male')
    })
  })

  describe('v-on', () => {
    it('ルート要素のclickでonClickメソッドが実行されること', () => {
      const stub = jest.fn()
      wrapper.setMethods({
        // スタブ化したいメソッド名をキーにスタブメソッドを指定
        onClick: stub,
      })
      wrapper.trigger('click')
      // スタブが呼ばれているかをかk人することでクリックされた時にonClickが呼ばれたことを確認する
      expect(stub).toHaveBeenCalled()
    })
    it('removeButtonのclickでonClickRemoveメソッドが実行', () => {
      const stub = jest.fn()
      wrapper.setMethods({
        onClickRemove: stub
      })
      wrapper.find('.UsersListItem_RemoveButton').trigger('click')
      expect(stub).toHaveBeenCalled()
    })
  })

  describe('methods', () => {
    it('selectイベントがemitされること', () => {
      wrapper.vm.onClick()
      expect(wrapper.emitted('select')).not.toBeUndefined()
      expect(wrapper.emitted('select')[0][0]).toEqual({id: 0})
    })
    it('removeイベントがemitされること', () => {
      wrapper.vm.onClickRemove()
      expect(wrapper.emitted('remove')).not.toBeUndefined()
      expect(wrapper.emitted('remove')[0][0]).toEqual({id: 0})
    })
  })
})
