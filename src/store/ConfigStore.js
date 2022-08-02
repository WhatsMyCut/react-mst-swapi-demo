import { action, autorun, observable, configure, makeObservable, runInAction } from 'mobx';
configure({ enforceActions: 'always' });

export class ConfigStore {
  language = null;
  theme = null;
  constructor(title) {
    this.language = /en/i.test(window.navigator.language) ? 'en' : 'fr';
    this.theme = window.matchMedia(`(prefers-color-scheme: dark)`).matches ? 'dark' : 'light';
    
    makeObservable(this, {
      language: observable,
      theme: observable,
      changeTheme: action
    })
    this.load();
    autorun(this.save);
  this.title = title
}
  // const [language, setLanguage] = useState(/en/i.test(window.navigator.language) ? 'en' : 'fr');
  // const [theme, setTheme] = useState(window.matchMedia(`(prefers-color-scheme: dark)`).matches ? 'dark' : 'light');
  save = () => window.localStorage.setItem(
      ConfigStore.name,
      JSON.stringify({
        language: this.language,
        theme: this.theme,
      }),
    );

  load = () => runInAction(() => 
    Object.assign(this, JSON.parse(window.localStorage.getItem(ConfigStore.name) || '{}'))
  );
    
  // const changeLanguage = (language) => {
  //   setLanguage(language);
  // };

  changeTheme = (theme) => {
    runInAction(() => this.setTheme(theme));
  };

  setTheme (theme) {
    this.theme = theme;
  }
  // useEffect(() => {
  //   makeObservable(this, {
  //     load: action,
  //     changeTheme: action,
  //     changeLanguage: action,
  //   });
  //   load();
  //   autorun(save);
  // }, [load, save]);

}

export default ConfigStore;