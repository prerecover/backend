import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { CategoryInput } from './dto/category-input';
import { AuthorId } from '../common/args/authorId';
import { LanguageTitle } from '../common/args/languageTitle';
import { PaginateArgs } from 'src/common/args/paginateArgs';

@Resolver(() => Book)
export class BooksResolver {
    constructor(private readonly booksService: BooksService) {}

    @Mutation(() => Book)
    async createBook(
        @Args('createBookInput') createBookInput: CreateBookInput,
        @Args() languageTitle: LanguageTitle,
        @Args() authorId: AuthorId,
        @Args('categories', { type: () => [CategoryInput] }) categories: CategoryInput[],
    ) {
        return await this.booksService.create(
            createBookInput,
            authorId.authorId,
            languageTitle.languageTitle,
            categories,
        );
    }

    @Query(() => [Book], { name: 'books' })
    async findAll(@Args() args: PaginateArgs) {
        return await this.booksService.findAll(args);
    }

    @Query(() => Book, { name: 'book' })
    async findOne(@Args('_id') id: string) {
        return await this.booksService.findOne(id);
    }

    @Mutation(() => Book)
    updateBook(
        @Args('updateBookInput') updateBookInput: UpdateBookInput,
        @Args('categories', { type: () => [CategoryInput] }) categories: CategoryInput[],
    ) {
        return this.booksService.update(updateBookInput._id, updateBookInput, categories);
    }

    @Mutation(() => Book)
    removeBook(@Args('_id') id: string) {
        return this.booksService.remove(id);
    }
}
