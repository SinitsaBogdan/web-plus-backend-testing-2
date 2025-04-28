import { PostsService } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(() => {
    service = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      {text: 'Post 1'},
      {text: 'Post 2'},
      {text: 'Post 3'},
      {text: 'Post 4'},
    ];

    beforeEach(() => {
      posts.forEach((post) => service.create(post));
    });

    it('should return all posts if called without options', () => {
      const received = service.findMany();
      expect(received.length).toEqual(4);  
      expect(received[0].text).toEqual(posts[0].text);  
    });

    it('should return correct posts for skip and limit options', () => {
      const received = service.findMany({skip: 1, limit: 1});
      expect(received.length).toEqual(1);  
      expect(received[0].text).toEqual(posts[1].text);  
    });

    it('Проверка метода find', () => {
      const received = service.find('1');
      expect(received?.id).toEqual('1');
      expect(received?.text).toEqual(posts[0].text);  
    });

    it('Проверка метода delete', () => {
      service.delete('1');
      let received = service.find('1');
      expect(received).toBeUndefined();  
      let received2 = service.findMany();
      expect(received2.length).toEqual(3);  
    });

    it('Проверка метода update - корректная', () => {
      const textUpdate = 'Post Update'
      service.update('1', {text: textUpdate});
      let received = service.find('1');
      expect(received?.id).toEqual('1');
      expect(received?.text).toEqual(textUpdate);  
    });

    it('Проверка метода update - не валидный ID', () => {
        const error = () => service.update('ывыв', {text: 'Post Update'});
        expect(() => error()).toThrow(Error)        
        expect(() => error()).toThrowError('Пост не найден')        
    });

  });
});