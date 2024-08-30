import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { LoginUserDto } from "./dto/login-user.dto";

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: "1",
      name: "Juan",
      password: "123",
      createdAt: new Date().getTime(),
      favorites: [],
    },
  ];

  /**
   * Crea un nuevo usuario.
   * @param createUserDto - Datos del usuario a crear.
   * @returns El usuario creado.
   */
  create(createUserDto: CreateUserDto): User {
    const user: User = {
      id: createUserDto.id,
      name: createUserDto.name,
      password: createUserDto.password,
      createdAt: new Date().getTime(),
    };

    this.users.push(user);
    return user;
  }

  /**
   * Obtiene la lista de todos los usuarios.
   * @returns Un array de usuarios.
   */
  findAll(): User[] {
    return this.users;
  }

  /**
   * Busca un usuario por ID.
   * @param id - ID del usuario a buscar.
   * @returns El usuario encontrado.
   * @throws NotFoundException - Si no se encuentra el usuario.
   */
  findOne(id: string): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(`User with id "${id}" not found`);
    return user;
  }

  /**
   * Inicia sesión con los datos proporcionados.
   * @param loginUserDto - Datos de inicio de sesión.
   * @returns El usuario autenticado.
   * @throws NotFoundException - Si no se encuentra el usuario.
   */
  login(loginUserDto: LoginUserDto): User {
    const loginUser = this.users.find(
      (user) => user.name === loginUserDto.name && user.password === loginUserDto.password,
    );

    if (!loginUser) throw new NotFoundException(`User not found`);

    return loginUser;
  }

  /**
   * Cierra sesión de un usuario específico.
   * @param userId - ID del usuario que cierra sesión.
   * @returns Un mensaje de confirmación de cierre de sesión.
   */
  logout(userId: string): string {
    return `User with ID ${userId} has been logged out successfully.`;
  }

  /**
   * Actualiza un usuario existente.
   * @param id - ID del usuario a actualizar.
   * @param updateUserDto - Datos para actualizar el usuario.
   * @returns El usuario actualizado.
   */
  update(id: string, updateUserDto: UpdateUserDto): User {
    let userDB = this.findOne(id);

    this.users = this.users.map((user) => {
      if (user.id === id) {
        userDB.updatedAt = new Date().getTime();
        userDB = { ...userDB, ...updateUserDto };
        return userDB;
      }
      return user;
    });
    return userDB;
  }

  /**
   * Elimina un usuario por ID.
   * @param id - ID del usuario a eliminar.
   */
  remove(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }

  /**
   * Marca una película como favorita para un usuario.
   * @param id - ID del usuario.
   * @param movieId - ID de la película.
   * @returns El usuario con la lista actualizada de favoritos.
   * @throws NotFoundException - Si el usuario no es encontrado.
   */
  markFavorite(id: string, movieId: string): User {
    const user = this.findOne(id);

    if (!user.favorites) {
      user.favorites = [];
    }

    if (!user.favorites.includes(movieId)) {
      user.favorites.push(movieId);
    }

    return user;
  }

  /**
   * Desmarca una película como favorita para un usuario.
   * @param id - ID del usuario.
   * @param movieId - ID de la película.
   * @returns El usuario con la lista actualizada de favoritos.
   * @throws NotFoundException - Si el usuario no es encontrado.
   */
  unmarkFavorite(id: string, movieId: string): User {
    const user = this.findOne(id);

    if (!user.favorites) {
      user.favorites = [];
    }

    user.favorites = user.favorites.filter((fav) => fav !== movieId);

    return user;
  }

  /**
   * Obtiene la lista de películas favoritas de un usuario.
   * @param id - ID del usuario.
   * @returns La lista de IDs de las películas favoritas.
   * @throws NotFoundException - Si el usuario no es encontrado.
   */
  getFavorites(id: string): string[] {
    const user = this.findOne(id);
    return user.favorites ?? [];
  }
}
