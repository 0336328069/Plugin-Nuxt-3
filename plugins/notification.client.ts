import { defineComponent, ref, h, createApp,watch } from 'vue';
export default defineNuxtPlugin(() => {
  return {
    provide: {
      notify: (options: any) => {
        return{
          show: (context: string) => {
            return new Promise((resolve) => {
              const comp = renderNotify(resolve);
              nextTick(() => {
                const div = document.createElement('div');
                div.classList.add('notification');
                document.body.appendChild(div);
                var component = createApp(comp, {
                  content: context,
                  contentClass: options.contentClass,
                  onCallBack: () => {
                    document.getElementById(`notify_${component._uid}`)?.remove();
                    component.unmount();
                  },
                });
                div.id = `notify_${component._uid}`;
                component.mount(div);
              })
            })
          } 
        }
      }
    }
  }
})

const renderNotify = (
  resolve: (value: boolean | PromiseLike<boolean>) => void,
): ReturnType<typeof defineComponent> => {
  return defineComponent({
    props:{
      content: {
        type: String,
        required: true
      },
      contentClass: {
        type: String,
        required: false,
        default: ''
      },
      onCallBack: Function
    },
    setup(props){
      const isShowNotify = ref(true);
      const close = () => {
        isShowNotify.value = false;
        props.onCallBack();
      };
      
      
      setTimeout(() => {
        close();
      }, 5000)
      return {
        isShowNotify,
        close
      }
    },
    render() {
      if(this.isShowNotify){
        return h(
          'div',
          {
            class: 'notify'
          },
          [
            h('span', {
              class: 'notify-content',
              innerHTML: this.content
            }),
            h('img', {
              class: 'notify-icon-close',
              src: 'https://drberg-dam.imgix.net/icons/icon-line-navigation-close.svg',
              onClick: () => this.close()
            })
          ]
        )
      }
      return null;
    }
  })
}